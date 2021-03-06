import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import moment from 'moment';
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Progress from 'components/Progress/Progress';

import { getItem } from '../../firebase/helpers';
import { getDynamicFields, getSectionName } from '../../utils/sections';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const SoilDetail = (props) => {
  const { classes, match } = props;
  const [id, setId] = useState('');
  const [soil, setSoil] = useState({});

  const [inputDisabled, setDisable] = useState(true);

  useEffect(() => {
    const { id } = match.params;
    setId(id);
    getItem('soil', id).then(newSoil => setSoil(newSoil));
  }, []);

  const renderDynamicFields = () => {
    const filterFields = ['id', 'user', 'location', 'date', 'notes'];
    const dynamicFields = [];

    _.mapObject(soil, (item, key) => {
      if (!_.contains(filterFields, key)) {
        dynamicFields.push(<h4>{getSectionName(key)}</h4>);
        _.mapObject(item, (value, name) => dynamicFields.push(
          <p>{getSectionName(name)}: {getSectionName(value)}</p>,
        ));
      }
    });
    return dynamicFields;
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            {!_.isEmpty(soil)
              ? (
                <Fragment>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Muestra de Tierra y Suelo</h4>
                    <p className={classes.cardCategoryWhite}>
                      Realizada {moment(soil.date).format('DD-MM-YYYY HH:mm')}
                    </p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <h4>Lugar</h4>
                        <p>
                          {soil.location.city}, {soil.location.province}
                        </p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <h4>Notas</h4>
                        {soil.notes}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Link
                          to={{
                            pathname: '/soil/update',
                            state: {
                              id,
                              soil,
                            },
                          }}
                        >
                          <Button color="success">
                            Editar Registro
                          </Button>
                        </Link>
                      </GridItem>
                    </GridContainer>
                    {renderDynamicFields()}
                  </CardBody>
                </Fragment>
              )
              : <Progress />
            }
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              {soil.user && (
                <Fragment>
                  <h6 className={classes.cardCategory}>{soil.user.role}</h6>
                  <h4 className={classes.cardTitle}>{`${soil.user.name} ${soil.user.lastName}`}</h4>
                </Fragment>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

SoilDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoilDetail);

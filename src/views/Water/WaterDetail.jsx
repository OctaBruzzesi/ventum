import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import moment from 'moment';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Progress from 'components/Progress/Progress';

import { getItem } from '../../firebase/helpers';
import { getDynamicFields } from '../../utils/sections';

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

const WaterDetail = (props) => {
  const { classes, match } = props;
  const [water, setWater] = useState({});

  useEffect(() => {
    const { id } = match.params;
    getItem('water', id).then(newWater => setWater(newWater));
  }, []);

  const renderDynamicFields = () => {
    const filterFields = ['id', 'location', 'date', 'notes'];
    const dynamicFields = [];

    _.mapObject(water, (item, key) => {
      if (!_.contains(filterFields, key)) {
        console.log(item);
      }
    });
    return dynamicFields;
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            {!_.isEmpty(water)
              ? (
                <Fragment>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Muestra de Agua</h4>
                    <p className={classes.cardCategoryWhite}>
                      Realizada {moment(water.date).format('DD-MM-YYYY HH:mm')}
                    </p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <h4>Lugar</h4>
                        <p>
                          {water.location.city}, {water.location.province}
                        </p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <h4>Notas</h4>
                        <p>{water.notes}</p>
                      </GridItem>
                    </GridContainer>
                    {renderDynamicFields()}
                  </CardBody>
                  <CardFooter>
                    <Button color="primary">Update Profile</Button>
                  </CardFooter>
                </Fragment>
              )
              : <Progress />
            }
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Geólogo</h6>
              <h4 className={classes.cardTitle}>Juan Perez</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

WaterDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(WaterDetail);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Button from 'components/CustomButtons/Button';

import { getWater } from 'redux/water/waterReducer';
import { fetchWater } from 'redux/water/waterActions';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

class Water extends Component {
  componentDidMount() {
    this.props.fetchWater();
  }

  getWaterTable() {
    const { water } = this.props;
    return water.data.map(item => [
      String(item.id),
      item.location.nameProvince,
      item.location.nameCity,
    ]);
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={9} md={9} />
        <GridItem xs={12} sm={3} md={3}>
          <Link to="/water/new">
            <Button color="primary">Nuevo Registro</Button>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Muestras de Agua</h4>
              <p className={classes.cardCategoryWhite}>
                Agua
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['ID', 'Provincia', 'Ciudad']}
                tableData={this.getWaterTable()}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  water: getWater(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWater: () => dispatch(fetchWater()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Water);

Water.propTypes = {
  water: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

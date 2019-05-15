import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from 'variables/charts';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import Chart from './Chart';

import { getFavourites } from '../../redux/favourites/favouritesReducer';
import { fetchFavourites } from '../../redux/favourites/favouritesActions';
import { getWater } from 'redux/water/waterReducer';
import { fetchWater } from 'redux/water/waterActions';

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.fetchFavourites();
    this.props.fetchWater();
  }

  render() {
    const { favourites, water, classes } = this.props;
    const sections = { water };
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              {
                favourites.list.map(item =>
                  <Chart
                    data={item}
                    key={item.id}
                    sections={sections}
                  />
                )
              }
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Contaminación de Aguas</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {' '}
                    55%
                  </span>
                  {' '}
                  productos contaminantes
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime />
                  {' '}
                  actualizado hace 4 minutos
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>CO2 en el aire</h4>
                <p className={classes.cardCategory}>
                  De datos muestreados en el 2018
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime />
                  {' '}
                  actualizado hace 2 días
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Temperatura anual</h4>
                <p className={classes.cardCategory}>
                  Del 2018
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime />
                  {' '}
                  actualizado hace 5 min
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Datos subidos</h4>
                <p className={classes.cardCategoryWhite}>
                  Por Usuarios
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={['ID', 'Nombre', 'Rol', 'Zona', 'Fecha']}
                  tableData={[
                    ['1', 'Juan Perez', 'Agua', 'Mendoza', '11/02/19 15:00 hs'],
                    ['2', 'Minerva Hooper', 'Suelo', 'Misiones', '15/02/19 16:00 hs'],
                    ['3', 'Sage Rodriguez', 'Bosques', 'Chaco', '18/02/19 15:00 hs'],
                    ['4', 'Philip Chaney', 'Producción y consumo sustentable', 'Santa Fe', '19/02/19 11:00 hs'],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchFavourites: PropTypes.func.isRequired,
  favourites: PropTypes.object.isRequired,
  water: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  favourites: getFavourites(state),
  water: getWater(state),
});

const mapDispatchToProps = dispatch => ({
  fetchFavourites: () => dispatch(fetchFavourites()),
  fetchWater: () => dispatch(fetchWater()),
});

export default compose(
  withStyles(dashboardStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);

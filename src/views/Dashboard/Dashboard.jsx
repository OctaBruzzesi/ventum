import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';
import { getWater } from 'redux/water/waterReducer';
import { fetchWater } from 'redux/water/waterActions';
import { getEnvironment } from 'redux/environment/environmentReducer';
import { fetchEnvironment } from 'redux/environment/environmentActions';
import { getBiodiversity } from 'redux/biodiversity/biodiversityReducer';
import { fetchBiodiversity } from 'redux/biodiversity/biodiversityActions';
import { getSoil } from 'redux/soil/soilReducer';
import { fetchSoil } from 'redux/soil/soilActions';
import { getProduction } from 'redux/production/productionReducer';
import { fetchProduction } from 'redux/production/productionActions';
import { getClimate } from 'redux/climate/climateReducer';
import { fetchClimate } from 'redux/climate/climateActions';
import Chart from './Chart';
import { getFavourites } from '../../redux/favourites/favouritesReducer';
import { fetchFavourites, deleteFavourites } from '../../redux/favourites/favouritesActions';

class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.fetchFavourites();
    this.props.fetchWater();
    this.props.fetchEnvironment();
    this.props.fetchBiodiversity();
    this.props.fetchSoil();
    this.props.fetchProduction();
    this.props.fetchClimate();
  }

  componentDidUpdate() {
    const { favourites } = this.props;
    
    if(favourites.deleteSuccess) {
      this.props.fetchFavourites();
    }
  }

  getUserName = (item) => {
    if (item.user) {
      return `${item.user.name} ${item.user.lastName}`;
    }
    return '';
  }

  getDashboardData = () => {
    const { water, environment, biodiversity, soil, production, climate } = this.props;

    let data = [];
    let formatedData = [];

    if (
      water.data.length &&
      environment.data.length &&
      biodiversity.data.length &&
      soil.data.length &&
      production.data.length &&
      climate.data.length
    ) {
      data = [
        {
          ...water.data[0],
          section: 'Agua'
        },
        {
          ...environment.data[0],
          section: 'Ambiente'
        },
        {
          ...biodiversity.data[0],
          section: 'Biodiversidad'
        },
        {
          ...soil.data[0],
          section: 'Tierra y Suelo'
        },
        {
          ...production.data[0],
          section: 'Produccion'
        },
        {
          ...climate.data[0],
          section: 'Clima'
        }
        
      ];
      formatedData = data.map(item => [
        String(item.id),
        item.section,
        item.notes,
        item.location.province,
        item.location.city,
        this.getUserName(item),
        moment(item.date).format('DD-MM-YYYY HH:mm'),
      ]);
    }

    return formatedData;
  }

  render() {
    const { favourites, water, classes, deleteFavourites } = this.props;
    const sections = { water };
    return (
      <div>
        <GridContainer>
          {
            favourites.list.map(item => (
              <GridItem xs={12} sm={12} md={6} key={item.id}>
                <Chart
                  data={item}
                  sections={sections}
                  removeFavourites={deleteFavourites}
                />
              </GridItem>
            ))
          }
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
                  tableHead={['ID', 'Seccion', 'Notas', 'Provincia', 'Ciudad', 'Usuario', 'Fecha']}
                  tableData={this.getDashboardData()}
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
  deleteFavourites: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  favourites: getFavourites(state),
  water: getWater(state),
  environment: getEnvironment(state),
  biodiversity: getBiodiversity(state),
  soil: getSoil(state),
  production: getProduction(state),
  climate: getClimate(state),
});
const mapDispatchToProps = dispatch => ({
  fetchFavourites: () => dispatch(fetchFavourites()),
  fetchWater: () => dispatch(fetchWater()),
  fetchEnvironment: () => dispatch(fetchEnvironment()),
  fetchBiodiversity: () => dispatch(fetchBiodiversity()),
  fetchSoil: () => dispatch(fetchSoil()),
  fetchProduction: () => dispatch(fetchProduction()),
  fetchClimate: () => dispatch(fetchClimate()),
  deleteFavourites: (id) => dispatch(deleteFavourites(id)),
});
export default compose(
  withStyles(dashboardStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);

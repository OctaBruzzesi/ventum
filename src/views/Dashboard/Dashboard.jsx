import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
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
import Chart from './Chart';
import { getFavourites } from '../../redux/favourites/favouritesReducer';
import { fetchFavourites } from '../../redux/favourites/favouritesActions';

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
          {
            favourites.list.map(item => (
              <GridItem xs={12} sm={12} md={6} key={item.id}>
                <Chart
                  data={item}
                  sections={sections}
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

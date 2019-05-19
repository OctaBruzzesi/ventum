import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import moment from 'moment';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Button from 'components/CustomButtons/Button';

import { addFavourites } from  'redux/favourites/favouritesActions';
import { getUser } from 'redux/users/usersReducer';
import { getWater } from 'redux/water/waterReducer';
import { fetchDynamicForm, fetchWater } from 'redux/water/waterActions';

import WaterChart from './WaterChart';

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
  constructor(props) {
    super(props);

    this.state = {
      filterProvince: '',
      filterCity: '',
      filterUser: '',
    };

    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    this.props.fetchDynamicForm();
    this.props.fetchWater();
  }

  onChangeText(event, value) {
    this.setState({ [value]: event.target.value });
  }

  getUserName(item) {
    if (item.user) {
      return `${item.user.name} ${item.user.lastName}`;
    }
    return '';
  }

  getWaterTable() {
    const { water } = this.props;
    const { filterUser, filterProvince, filterCity } = this.state;
    let waterCollection = water.data;

    if (filterUser !== '') {
      waterCollection = waterCollection.filter(
        item => item.user && (item.user.name.toLowerCase().startsWith(filterUser.toLowerCase())
          || item.user.lastName.toLowerCase().startsWith(filterUser.toLowerCase()))
      );
    }

    if (filterProvince !== '') {
      waterCollection = waterCollection.filter(
        item => item.location.province.toLowerCase().startsWith(filterProvince.toLowerCase())
      );
    }

    if (filterCity !== '') {
      waterCollection = waterCollection.filter(
        item => item.location.city.toLowerCase().startsWith(filterCity.toLowerCase())
      );
    }

    return waterCollection.map(item => [
      String(item.id),
      item.location.province,
      item.location.city,
      this.getUserName(item),
      moment(item.date).format('DD-MM-YYYY HH:mm'),
    ]);
  }

  addFavourites = (values) => {
    const { addFavourites, user } = this.props;
    console.log(values);
    addFavourites(values, user.user.email);
  }

  render() {

    const { classes, user, history, water } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <WaterChart water={water} user={user} addFavourites={this.addFavourites} />
        </GridItem>

        <GridItem xs={12} sm={3} md={3}>
          <CustomInput
            labelText="Usuario"
            id="filterUser"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: event => this.onChangeText(event, 'filterUser'),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3} md={3}>
          <CustomInput
            labelText="Provincia"
            id="filterProvince"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: event => this.onChangeText(event, 'filterProvince'),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3} md={3}>
          <CustomInput
            labelText="Ciudad"
            id="filterCity"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: event => this.onChangeText(event, 'filterCity'),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3} md={3} />
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
                onClick={item => history.push(`/water/${item[0]}`)}
                tableHeaderColor="primary"
                tableHead={['ID', 'Provincia', 'Ciudad', 'Usuario', 'Fecha']}
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
  user: getUser(state),
  water: getWater(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWater: () => dispatch(fetchWater()),
  addFavourites: (newFavourite, user) => dispatch(addFavourites(newFavourite, user)),
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Water);

Water.propTypes = {
  water: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  fetchWater: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

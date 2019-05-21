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

import { addFavourites } from 'redux/favourites/favouritesActions';
import { getUser } from 'redux/users/usersReducer';
import { getEnvironment } from 'redux/environment/environmentReducer';
import { fetchDynamicForm, fetchEnvironment } from 'redux/environment/environmentActions';

import EnvironmentChart from './EnvironmentChart';

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

class Environment extends Component {  
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
    this.props.fetchEnvironment();
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

  getEnvironmentTable() {
    const { environment } = this.props;
    const { filterUser, filterProvince, filterCity } = this.state;
    let environmentCollection = environment.data;

    if (filterUser !== '') {
      environmentCollection = environmentCollection.filter(
        item => item.user && (item.user.name.toLowerCase().startsWith(filterUser.toLowerCase())
          || item.user.lastName.toLowerCase().startsWith(filterUser.toLowerCase()))
      );
    }

    if (filterProvince !== '') {
      environmentCollection = environmentCollection.filter(
        item => item.location.province.toLowerCase().startsWith(filterProvince.toLowerCase())
      );
    }

    if (filterCity !== '') {
      environmentCollection = environmentCollection.filter(
        item => item.location.city.toLowerCase().startsWith(filterCity.toLowerCase())
      );
    }

    return environmentCollection.map(item => [
      String(item.id),
      item.notes,
      item.location.province,
      item.location.city,
      this.getUserName(item),
      moment(item.date).format('DD-MM-YYYY HH:mm'),
    ]);
  }

  addFavourites = (values) => {
    const { addFavourites, user } = this.props;
    addFavourites(values, user.user.email);
  }

  render() {
    const { classes, user, history, environment } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <EnvironmentChart environment={environment} user={user} addFavourites={this.addFavourites} />
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
          <Link to="/environment/new">
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
                onClick={item => history.push(`/environment/${item[0]}`)}
                tableHeaderColor="primary"
                tableHead={['ID', 'Notas', 'Provincia', 'Ciudad', 'Usuario', 'Fecha']}
                tableData={this.getEnvironmentTable()}
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
  environment: getEnvironment(state),
});

const mapDispatchToProps = dispatch => ({
  fetchEnvironment: () => dispatch(fetchEnvironment()),
  addFavourites: (newFavourite, user) => dispatch(addFavourites(newFavourite, user)),
  fetchDynamicForm: () => dispatch(fetchDynamicForm()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Environment);

Environment.propTypes = {
  environment: PropTypes.object.isRequired,
  fetchDynamicForm: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchEnvironment: PropTypes.func.isRequired,
  addFavourites: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

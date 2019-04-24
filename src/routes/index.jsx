import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from 'layouts/Dashboard/Dashboard';
import Login from '../views/Auth/Login';
import authRoutes from './auth';
import { getAuth } from '../redux/auth/authReducer';
import { getAuthFromStorage } from '../redux/auth/authActions';

const hist = createBrowserHistory();

class Routes extends Component {
  state = {
  }

  componentDidMount() {
    this.props.getAuthFromStorage();
  }

  getAuthRoutes() {
    const routes = authRoutes.map(item => <Route path={item.path} component={item.component} />);
    routes.push(<Redirect from="/" to="/login" />);
    return routes;
  }

  render() {
    const { auth } = this.props;
    return (
      <Router history={hist}>
        <Switch>
          {
            auth.authData && auth.authData.token
              ? <Route path="/" component={Dashboard} />
              : this.getAuthRoutes()
          }
        </Switch>
      </Router>
    );
  }
}

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  getAuthFromStorage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: getAuth(state),
});

const mapDispatchToProps = dispatch => ({
  getAuthFromStorage: () => dispatch(getAuthFromStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

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
import { setUserFromStorage } from '../redux/users/usersActions';

const hist = createBrowserHistory();

class Routes extends Component {
  state = {
  }

  componentDidMount() {
    this.props.getAuthFromStorage();
  }

  getAuthRoutes() {
    const routes = authRoutes.map((item, key) => <Route path={item.path} component={item.component} key={key} />);
    routes.push(<Redirect from="/" to="/login" key={"login"} />);
    return routes;
  }

  render() {
    const { auth } = this.props;

    let isLoggedIn = false;

    if (auth.authData && auth.authData.token) {
      isLoggedIn = true;
      this.props.setUserFromStorage();
    }
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
  setUserFromStorage: () => dispatch(setUserFromStorage()),
  getAuthFromStorage: () => dispatch(getAuthFromStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

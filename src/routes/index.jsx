import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from '../views/Auth/Login';
import Dashboard from 'layouts/Dashboard/Dashboard';
import { getAuth } from '../redux/auth/authReducer';
import { getAuthFromStorage } from '../redux/auth/authActions';

const hist = createBrowserHistory();

const isLogedIn = localStorage.getItem("login");

const indexRoutes = [
  isLogedIn ?
    { path: '/', component: Dashboard }
    :
    { path: '/', component: Login }
];

class Routes extends Component {
  state = {
    authData: {}
  }

  componentDidMount() {
    this.props.getAuthFromStorage();
  }

  render() {
    const { auth } = this.props;
    return (
      <Router history={hist}>
        <Switch>
          {
            auth.authData.token ?
            <Route path={'/'} component={Dashboard} />
            :
            <Route path={'/'} component={Login} />
          }
        </Switch>
      </Router>
    )
  }
}

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  getAuthFromStorage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: getAuth(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthFromStorage: () => dispatch(getAuthFromStorage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

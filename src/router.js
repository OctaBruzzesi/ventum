import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Login from './views/Auth/Login';
import Dashboard from './views/Dashboard/Dashboard';
//import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const isLoggedIn = localStorage.getItem("login");

const RestrictedRoute = ({ component: Component, isLoggedIn = false, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={Login}
        />
        <RestrictedRoute
          path='/dashboard'
          component={Dashboard}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default PublicRoutes;

/*export default connect(state => ({
  isLoggedIn: localStorage.getItem('token') ? true : false
}))(PublicRoutes);*/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
//import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

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

const PublicRoutes = ({ history, isLoggedIn = false }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() =>
            import('./containers/Page/Signin/signin')
          )}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() =>
            import('./containers/Page/Signin/signin')
          )}
        />
        <RestrictedRoute
          path='/dashboard'
          component={App}
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

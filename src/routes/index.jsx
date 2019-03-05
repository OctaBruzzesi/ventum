import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from 'layouts/Dashboard/Dashboard';
import Login from '../views/Auth/Login';
import { getAuth } from '../redux/auth/authReducer';
import { getAuthFromStorage } from '../redux/auth/authActions';

const hist = createBrowserHistory();

class Routes extends Component {
  state = {
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
            auth.authData.token
              ? <Route path="/" component={Dashboard} />
              : <Route path="/" component={Login} />
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

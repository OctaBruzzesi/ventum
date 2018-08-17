import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Login extends Component {

  login() {
    localStorage.setItem('login', 'login');
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="login-box">
        <p>Login</p>
        <Button variant="contained" color="primary" onClick={this.login.bind(this)}>
          Primary
        </Button>
      </div>
    )
  }
}

export default Login;
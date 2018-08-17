import React, { Component } from 'react';
import { auth } from '../../firebase/auth';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = () =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push('/dashboard');
      })
      .catch(error => {
        this.setState(this.byPropKey('error', error));
      });

    event.preventDefault();
  }

  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
            value={username}
            onChange={event => this.setState(this.byPropKey('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={event => this.setState(this.byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={event => this.setState(this.byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState(this.byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <button type="submit">
            Sign Up
          </button>

          { error && <p>{error.message}</p> }
      </form>
    );
  }
}

/*const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
*/

export default SignUpPage;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import { getAuth } from 'redux/auth/authReducer';
import { getUser } from 'redux/users/usersReducer';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import loginStyle from 'assets/jss/material-dashboard-react/layouts/loginStyle';
import { signUp } from '../../redux/auth/authActions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      repeatedPassword: '',
      error: '',
    };

    this.validateFields = this.validateFields.bind(this);
  }

  componentDidUpdate() {
    // const { history, auth, user } = this.props;

    // console.log('actualiz');

    // if (user.userRegister) {
    //   console.log('todo bien crack');
    // }
  }

  onChangeText(event, value) {
    this.setState({ [value]: event.target.value });
  }

  validateFields() {
    const { userName, email, password, repeatedPassword, name, lastName } = this.state;

    if (password === repeatedPassword) {
      // registro en Autenticacion
      this.props.signUp({
        userName,
        email,
        password,
        name,
        lastName,
      });
    } else {
      this.setState({ error: 'Las contraseñas no coinciden.' });
    }
  }

  renderButtonBackToLogin() {
    return (
      <Link to="/">Volver a Login</Link>
    );
  }

  render() {
    const { auth, classes } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitle}>REGISTRARSE</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Nombre de Usuario"
                        id="userName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'userName'),
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    {/* NOMBRE */}
                    <GridItem xs={6} sm={6} md={6}>
                      <CustomInput
                        labelText="Nombre"
                        id="name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'name'),
                        }}
                      />
                    </GridItem>

                    {/* APELLIDO */}
                    <GridItem xs={6} sm={6} md={6}>
                      <CustomInput
                        labelText="Apellido"
                        id="lastName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'lastName'),
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'email'),
                          type: 'email',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <CustomInput
                        labelText="Contraseña"
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'password'),
                          type: 'password',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <CustomInput
                        labelText="Repetir Contraseña"
                        id="repeatedPassword"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'repeatedPassword'),
                          type: 'password',
                        }}
                      />
                    </GridItem>


                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel error>{ auth.error }</InputLabel>
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <GridItem xs={6}>
                    {this.renderButtonBackToLogin(classes)}
                    <Link to="/" />
                  </GridItem>
                  <GridItem xs={6}>
                    <Button
                      color="primary"
                      onClick={this.validateFields}
                    >
                      Registrarse
                    </Button>
                  </GridItem>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signUp: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: getAuth(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  signUp: newUser => dispatch(signUp(newUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginStyle)(SignUp));

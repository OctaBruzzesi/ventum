import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import withStyles from "@material-ui/core/styles/withStyles";
import { getAuth } from 'redux/auth/authReducer';
import { login } from '../../redux/auth/authActions';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Progress from 'components/Progress/Progress.jsx';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter";


import loginStyle from "assets/jss/material-dashboard-react/layouts/loginStyle";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: '',
      password: ''
    }

    this.login = this.login.bind(this);
  }

  login() {
    const { user, password } = this.state;
    this.setState({ loading: true });
    this.props.login(user, password);
  }

  onChangeText(event, value) {
    this.setState({ [value]: event.target.value });
  }

  renderButton() {
    const { auth } = this.props;

    if (auth.loading) {
      return (
        <Progress />
      );
    }
    return (
      <Button color="primary" onClick={this.login}>
        Ingresar
      </Button>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitle}>Login</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Usuario"
                        id="username"
                        value={this.state.user}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'user')
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Contraseña"
                        id="password"
                        value={this.state.password}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'password'),
                          type: 'password'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={6}>
                      {this.renderButton()}
                    </GridItem>
                    <GridItem xs={6}>
                      <Link to="/signUp"></Link>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: getAuth(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, pass) => dispatch(login(email, pass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginStyle)(Login));
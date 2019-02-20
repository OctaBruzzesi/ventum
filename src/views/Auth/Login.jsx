import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import withStyles from "@material-ui/core/styles/withStyles";
import { login } from '../../redux/auth/authActions';
import Paper from '@material-ui/core/Paper';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter";


import loginStyle from "assets/jss/material-dashboard-react/layouts/loginStyle";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  login() {
    this.props.login('octa.bruzzesi@gmail.com', 'octa123');
    // .then(e => console.log(e))
    // .catch(e => console.log(e));
    // this.props.history.push('/dashboard');
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
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Contraseña"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={6}>
                      <Button color="primary" onClick={this.login.bind(this)}>
                        Ingresar
                      </Button>
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
  login: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, pass) => dispatch(login(email, pass))
  }
}

export default connect(null, mapDispatchToProps)(withStyles(loginStyle)(Login));
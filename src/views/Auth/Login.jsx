import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import { getAuth } from 'redux/auth/authReducer';

//CSS
import '../../assets/css/login.css';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import Progress from 'components/Progress/Progress';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import loginStyle from 'assets/jss/material-dashboard-react/layouts/loginStyle';
import { login } from '../../redux/auth/authActions';

// import { logoVentum } from '../../assets/img/logo/logoVentum.png';

const styleImg = {
  'height': '8em',
};

const styleBody = {
  'background': 'white',
};

const styleGrid = {
  'width': '98%',
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
    };

    this.login = this.login.bind(this);
  }

  onChangeText(event, value) {
    this.setState({ [value]: event.target.value });
  }

  login() {
    const { user, password } = this.state;

    this.props.login(user, password);
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
    );
  }


  render() {
    const { classes } = this.props;
    return (
      <div style={styleBody} className={classes.content}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={3} md={3} lg={3} />
            <GridItem xs={6} md={6} lg={6}>
              <img style={styleImg} src={require('../../assets/img/logo/logoVentum.png')}></img>
            </GridItem>
          </GridContainer>
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
                        labelText="Email"
                        id="username"
                        value={this.state.user}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'user'),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Contraseña"
                        id="password"
                        value={this.state.password}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.onChangeText(event, 'password'),
                          type: 'password',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel error>{this.props.auth.error}</InputLabel>                        
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer
                    justify="justify-between"
                    style={styleGrid}
                  >
                    <GridItem xs={8} md={8} lg={8}>
                      {this.renderButton()}
                    </GridItem>
                    <GridItem xs={4} md={4} lg={4}>
                      <Link to="/signUp">
                        <Button
                          color="success"
                          simple={true}
                          link={true}
                        >
                          ¿Todavía no tiene cuenta? Regístrese aquí
                        </Button>
                      </Link>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: getAuth(state),
});

const mapDispatchToProps = dispatch => ({
  login: (email, pass) => dispatch(login(email, pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginStyle)(Login));

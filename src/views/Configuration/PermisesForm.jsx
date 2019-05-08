import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import { Select } from 'components/Form';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';

import permises, { ADMIN, WORKER } from '../../utils/permises';
import { getUser } from '../../redux/users/usersReducer';
import { setPermits } from '../../redux/configuration/permitsActions';
import { getUsersID } from '../../redux/users/usersActions';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

class PermisesForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxWidth: 'lg',
      permits: '',
      userName: '',
      error: '',
    };

    this.updateUserPermits = this.updateUserPermits.bind(this);
    this.handlePermitsSelect = this.handlePermitsSelect.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
  }

  componentDidMount() {
    this.props.getUsersID();
  }

  getUsers() {
    const { user } = this.props;
    
    return user.data.map(item => [
      String(item),
    ]);
  }

  handlePermitsSelect(event) {
    this.setState({
      permits: event.target.value,
    });
  }

  handleUserSelect(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  updateUserPermits() {
    const { userName, permits } = this.state;

    if (userName === '' || permits === '') { 
      this.setState({ error: 'Debe elegir un usuario y un permiso.'});
      return;
    }

    this.setState({ error: '' });

    let newPermits = {
      admin: false,
      worker: false,
    };

    switch (permits) {
      case ADMIN:
        newPermits = {
          admin: true,
          worker: true,
        };
        break;

      case WORKER:
        newPermits = {
          admin: false,
          worker: true,
        };
        break;

      default:
        break;
    }

    this.props.setPermits(userName, newPermits);
  }

  render() {
    const {
      classes,
      history,
      handleSubmit,
      onFormSubmit,
      handleModalClose,
      openPermises,
    } = this.props;

    const { maxWidth } = this.state;
    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth
        open={openPermises}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Configuración de Permisos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={classes.form} onSubmit={handleSubmit(this.updateUserPermits)}>

              <GridContainer>
                <GridItem md={6}>
                  <Field
                    name="permises"
                    component={Select}
                    items={permises}
                    label="Permisos"
                    onChange={this.handlePermitsSelect}
                  />
                </GridItem>
                <GridItem md={6}>
                  <Field
                    name="users"
                    component={Select}
                    items={this.getUsers()}
                    label="Usuarios"
                    onChange={this.handleUserSelect}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel error>{this.state.error}</InputLabel>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem md={6}>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={this.updateUserPermits}
                  >
                    Guardar cambios
                  </Button>
                </GridItem>
                <GridItem md={6}>
                  <Button
                    onClick={handleModalClose}
                  >
                    Cancelar
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

PermisesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  openPermises: PropTypes.bool.isRequired,
  setPermits: PropTypes.object.isRequired,
  getUser: PropTypes.object.isRequired,
  getUsersID: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  setPermits: (userName, newPermits) => dispatch(setPermits(userName, newPermits)),
  getUsersID: () => dispatch(getUsersID()),
});

export default compose(
  reduxForm({
    form: 'EditePermisesForm',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles),
)(PermisesForm);

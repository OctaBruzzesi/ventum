import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compose } from 'recompose';
import _ from 'underscore';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import { InputText, Select } from 'components/Form';
import { required, number, email } from '../../utils/validations';
import provinces from '../../utils/provinces';

const styles = {
  formTitleSection: {
    fontFamily: 'Roboto',
    marginTop: '50px',
  },
  formItem: {
    marginTop: '50px',
  },
};

class WaterForm extends PureComponent {
  state = {
    modalOpen: false,
  }

  addSection = () => {
    this.setState({ modalOpen: true });
  }

  renderDynamicForm() {
    const { dynamicForm, classes } = this.props;

    const dynamicFields = [];

    console.log(classes);

    _.mapObject(dynamicForm, (form, key) => {
      dynamicFields.push(
        <GridItem md={12} key={key}>
          <h3 className={classes.formTitleSection}>{form.label}</h3>
        </GridItem>,
      );
      _.map(form.fields, (item) => {
        dynamicFields.push(
          <GridItem key={item.key} md={3}>
            <Field
              name={`${key}.${item.key}`}
              component={InputText}
              validate={[required]}
              type="number"
              label={item.label}
            />
          </GridItem>,
        );
      });
      dynamicFields.push(
        <Button key={`${key}button`}>Agregar campos</Button>,
      );
    });
    return dynamicFields;
  }

  render() {
    const { modalOpen } = this.state;
    const {
      history,
      handleSubmit,
      classes,
      onFormSubmit,
    } = this.props;

    return (
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onFormSubmit.bind(this))}>
            <GridContainer>
              <GridItem md={3}>
                <Field
                  name="location.province"
                  component={Select}
                  validate={[required]}
                  items={provinces}
                  label="Provincia"
                />
              </GridItem>
              <GridItem md={6}>
                <Field
                  name="location.city"
                  component={InputText}
                  validate={[required]}
                  type="text"
                  label="Ciudad/Lugar"
                />
              </GridItem>
              <GridItem md={3} className={classes.formItem}>
                <Field
                  name="date"
                  component={InputText}
                  validate={[required]}
                  type="datetime-local"
                  label="Fecha de la muestra"
                />
              </GridItem>
              <GridItem md={9} />

              {this.renderDynamicForm()}

              <GridItem md={12}>
                <Button
                  className={classes.formItem}
                  onClick={this.addSection}
                >
                  Agregar Sección
                </Button>
              </GridItem>

              <GridItem md={12}>
                <div className={classes.formItem}>
                  {/* TODO: refactor */}
                  <Field
                    name="notes"
                    validate={[required]}
                    component={InputText}
                    className={classes.formItem}
                    type="text"
                    label="Notas"
                  />
                </div>
              </GridItem>

              <GridItem className={classes.formItem}>
                <div className={classes.formItem}>
                  <Button
                    type="submit"
                    color="primary"
                  >
                    Ok
                  </Button>
                  <Button
                    onClick={() => history.goBack()}
                  >
                    No guardar
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </form>
        </CardBody>

        <Dialog
          open={modalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <form onSubmit={handleSubmit(values => console.log(values))}>
            <DialogContent>
              <DialogContentText>
                Una sección es un grupo de datos que se relacionan entre sí.
                Por ejemplo: dentro de la sección Residuos Naturales
                se encontrarán los datos Resiuos de Benceno y
                Residuos de Carbono.
              </DialogContentText>
              <Field
                name="section"
                type="text"
                validate={[required]}
                component={InputText}
                label="Nombre de Sección"
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Card>
    );
  }
}

WaterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  dynamicForm: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

WaterForm.defaultProps = {
  dynamicForm: {},
};

export default compose(
  reduxForm({
    form: 'WaterNewForm',
  }),
  withRouter,
  withStyles(styles),
)(WaterForm);

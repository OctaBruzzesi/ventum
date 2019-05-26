import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
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
import { getSectionName } from '../../utils/sections';

const styles = {
  formTitleSection: {
    fontFamily: 'Roboto',
    marginTop: '50px',
  },
  formItem: {
    marginTop: '50px',
  },
};

const WaterForm = (props) => {
  const [modalValues, setModalValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sectionName: '',
      sectionKey: '',
    },
  );

  const [modalFieldValues, setModalFieldValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      fieldKey: '',
      fieldType: '',
    },
  );

  const [modalOpen, handleModalOpen] = useState(false);

  const [sectionSelected, setSectionSelected] = useState('');

  const [modalFieldOpen, handleModalFieldOpen] = useState(false);

  const [snackbar, setSnackbar] = useState(false);

  const addSection = () => {
    props.addSection(modalValues.sectionName, modalValues.sectionKey);
    handleModalOpen(!modalOpen);
    setModalValues({ sectionName: '', sectionKey: '' });
  };

  const addField = () => {
    props.addField(sectionSelected, modalFieldValues.fieldKey, modalFieldValues.fieldType);
    handleModalFieldOpen(!modalFieldOpen);
    setModalFieldValues({ fieldKey: '', fieldType: '' });
  };

  const handleSectionEdit = (section) => {
    setSectionSelected(section);
    handleModalFieldOpen(!modalFieldOpen);
  };

  const handleModalInput = (event) => {
    const { name, value } = event.target;

    setModalValues({ [name]: value });
  };

  const handleModalFieldsInput = (event) => {
    const { name, value } = event.target;

    setModalFieldValues({ [name]: value });
  };

  const renderDynamicForm = (dynamicForm, classes) => {
    const dynamicFields = [];

    _.mapObject(dynamicForm, (form, key) => {
      dynamicFields.push(
        <GridItem md={12} key={key}>
          <h3 className={classes.formTitleSection}>{getSectionName(key)}</h3>
        </GridItem>,
      );
      _.map(form.fields, (item) => {
        dynamicFields.push(
          <GridItem key={item.key} md={3}>
            <Field
              name={`${key}.${item.key}`}
              component={InputText}
              type={item.type}
              label={getSectionName(item.key)}
            />
          </GridItem>,
        );
      });
      dynamicFields.push(
        <Button
          key={`${key}button`}
          onClick={() => handleSectionEdit(key)}
        >
          Agregar campos
        </Button>,
      );
    });
    return dynamicFields;
  };

  const {
    history,
    handleSubmit,
    classes,
    dynamicForm,
    onFormSubmit,
  } = props;

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
                label="Ciudad/Lugar"
              />
            </GridItem>
            <GridItem md={3} className={classes.formItem}>
              <Field
                name="date"
                component={InputText}
                validate={[required]}
                label="Fecha de la muestra"
              />
            </GridItem>
            <GridItem md={9} />

            {renderDynamicForm(dynamicForm, classes)}

            <GridItem md={12}>
              <Button
                className={classes.formItem}
                onClick={() => handleModalOpen(!modalOpen)}
              >
                Agregar Sección
              </Button>
            </GridItem>

            <GridItem md={12}>
              <div className={classes.formItem}>
                <Field
                  name="notes"
                  validate={[required]}
                  component={InputText}
                  className={classes.formItem}
                  label="Notas"
                />
              </div>
            </GridItem>

            <GridItem className={classes.formItem}>
              <div className={classes.formItem}>
                <Button
                  onClick={() => {
                    setSnackbar(true);
                    setTimeout(() => history.goBack(), 1500);
                  }}
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

      <Snackbar
        message="Muestra guardada con éxito!"
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      />

      <Dialog
        open={modalOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar Grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Grupo de datos que se relacionan entre sí.
            Por ejemplo: dentro de la sección Residuos Naturales
            se encontrarán los datos Resiuos de Benceno y
            Residuos de Carbono.
          </DialogContentText>
          <TextField
            label="Key"
            name="sectionKey"
            onChange={handleModalInput}
            id="sectionName"
            value={modalValues.sectionKey}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalOpen(!modalOpen)} type="submit" color="primary">
            Cancel
          </Button>
          <Button onClick={() => addSection()} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalFieldOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar Campo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Campo de un valor de un grupo de datos.
          </DialogContentText>
          <TextField
            label="Nombre"
            name="fieldKey"
            onChange={handleModalFieldsInput}
            id="fieldKey"
            value={modalFieldValues.fieldKey}
            fullWidth
          />
          <TextField
            label="Unidad"
            name="fieldType"
            onChange={handleModalFieldsInput}
            id="fieldType"
            value={modalFieldValues.fieldType}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalFieldOpen(!modalFieldOpen)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addField()} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

WaterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
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

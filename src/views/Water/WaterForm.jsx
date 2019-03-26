import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import { InputText } from 'components/Form';
import { required, number, email } from '../../utils/validations';

class WaterForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      onFormSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onFormSubmit.bind(this))}>
        <GridContainer>
          <GridItem md={12}>
            <Field
              name="province"
              component={InputText}
              validate={[required]}
              type="text"
              label="Provincia"
            />
          </GridItem>
          <GridItem md={12}>
            <Field
              name="city"
              component={InputText}
              validate={[required]}
              type="text"
              label="Ciudad"
            />
          </GridItem>
          <GridItem md={3}>
            <Field
              name="date"
              component={InputText}
              validate={[required]}
              type="datetime-local"
              label="Fecha de la muestra"
            />
          </GridItem>
          <GridItem md={12}>
            <Field
              name="coliforms"
              component={InputText}
              type="number"
              label="N° de coliformes"
            />
          </GridItem>
          <GridItem md={12}>
            <Field
              name="notes"
              validate={[required]}
              component={InputText}
              type="text"
              label="Notas"
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <Button
            type="submit"
          >
            Ok
          </Button>
          <Button
            type="danger"
          >
            No guardar
          </Button>
        </GridContainer>
      </form>
    );
  }
}

WaterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'WaterNewForm',
  }),
  withStyles({}),
)(WaterForm);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import { renderField } from 'components/Form';

class WaterForm extends PureComponent {
  submit = (values) => {
    console.log(values);
  }

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
              component={renderField}
              type="text"
              label="Provincia"
            />
          </GridItem>
          <GridItem md={12}>
            <Field
              name="city"
              component={renderField}
              type="text"
              label="Ciudad"
            />
          </GridItem>
          <GridItem md={12}>
            <Field
              name="date"
              component={renderField}
              type="text"
              label="Fecha de la muestra"
            />
          </GridItem>
          <GridItem>
            <Field
              name="coliforms"
              component={renderField}
              type="text"
              label="N° de coliformes"
            />
          </GridItem>
          <GridItem md={12}>
            <Field
              name="notes"
              component={renderField}
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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import ButtonBase from '@material-ui/core/ButtonBase';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import { InputText, Select } from 'components/Form';
import { required, number, email } from '../../utils/validations';
import provinces from '../../utils/provinces';

class WaterForm extends PureComponent {
  render() {
    const {
      history,
      handleSubmit,
      onFormSubmit,
    } = this.props;

    return (
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onFormSubmit.bind(this))}>
            <GridContainer>
              <GridItem md={3}>
                <Field
                  name="province"
                  component={Select}
                  validate={[required]}
                  items={provinces}
                  label="Provincia"
                />
              </GridItem>
              <GridItem md={6}>
                <Field
                  name="city"
                  component={InputText}
                  validate={[required]}
                  type="text"
                  label="Ciudad/Lugar"
                />
              </GridItem>
              <GridItem md={3} />
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
                color="primary"
              >
                Ok
              </Button>
              <Button
                onClick={() => history.goBack()}
              >
                No guardar
              </Button>
            </GridContainer>
          </form>
        </CardBody>
      </Card>
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
  withRouter,
  withStyles({}),
)(WaterForm);

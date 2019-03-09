import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import { renderField } from 'components/Form';

class WaterNew extends PureComponent {
  render() {
    const {
      isSaveInProgress,
      onFormSubmit,
      handleSubmit,
      stateOptions,
      history,
    } = this.props;

    return (
      <form>
        <GridContainer>
          <GridItem>
            <Field
              name="name"
              component={renderField}
              type="text"
              placeholder="Nombre"
            />
          </GridItem>
        </GridContainer>

        <GridContainer>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '15px' }}
            loading={() => {}}
          >
            Ok
          </Button>
          <Button
            type="danger"
            htmlType="button"
            onClick={history.goBack}
            disabled={() => {}}
          >
            No guardar
          </Button>
        </GridContainer>
      </form>
    );
  }
}

// WaterNew.propTypes = {
//   isSaveInProgress: PropTypes.bool.isRequired,
//   onFormSubmit: PropTypes.func.isRequired,
//   stateOptions: PropTypes.array.isRequired,
// };

export default reduxForm({
  form: 'WaterNew',
  initialValues: {
    state: 'NO_VALUE',
    contactState: 'NO_VALUE',
  },
})(WaterNew);

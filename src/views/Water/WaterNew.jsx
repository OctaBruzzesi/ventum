import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import { renderField } from 'components/Form';

class WaterNew extends PureComponent {
  render() {
    const {
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
          >
            Ok
          </Button>
          <Button
            type="danger"
            onClick={history.goBack}
          >
            No guardar
          </Button>
        </GridContainer>
      </form>
    );
  }
}

WaterNew.propTypes = {
  isSaveInProgress: PropTypes.bool,
  onFormSubmit: PropTypes.func,
  stateOptions: PropTypes.array,
  history: PropTypes.object,
};

export default compose(
  reduxForm({
    form: 'WaterNew',
    initialValues: {
      state: 'NO_VALUE',
      contactState: 'NO_VALUE',
    },
  }),
  withStyles({}),
)(WaterNew);

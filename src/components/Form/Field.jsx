import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const InputText = ({
  input, type, name, label, disabled, meta: { touched, error },
}) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <TextField
      {...input}
      name={name}
      disabled={disabled}
      error={Boolean(touched && error)}
      fullWidth
      label={label}
      className={(touched && error ? 'error' : '')}
    />
    <p style={{ marginTop: '21px' }}>{type}</p>
  </div>
);

export { InputText };

InputText.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
};

InputText.defaultProps = {
  type: '',
  name: '',
  label: '',
  disabled: false,
};

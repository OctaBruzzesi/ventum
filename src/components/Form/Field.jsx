import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const InputText = ({
  input, type, name, label, disabled, meta: { touched, error },
}) => (
  <TextField
    {...input}
    name={name}
    disabled={disabled}
    error={Boolean(touched && error)}
    fullWidth
    type={type}
    helperText={touched ? error : ''}
    label={label}
    className={(touched && error ? 'error' : '')}
  />
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
  type: 'primary',
  name: '',
  label: '',
  disabled: false,
};

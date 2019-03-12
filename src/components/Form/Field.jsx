import React from 'react';

import TextField from '@material-ui/core/TextField';

const renderField = ({
  input, type, name, label, disabled, autocomplete, meta: { touched, error },
}) => (
  <TextField
    {...input}
    size="large"
    name={name}
    disabled={disabled}
    type={type}
    label={label}
    fullWidth
    autoComplete={autocomplete}
    className={(touched && error ? 'error' : '')}
  />
);

export { renderField };

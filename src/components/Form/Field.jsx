import React from 'react';

import Input from '@material-ui/core/Input';

const renderField = ({
  input, type, name, placeholder, disabled, autocomplete, meta: { touched, error },
}) => (
  <Input
    {...input}
    size="large"
    name={name}
    disabled={disabled}
    type={type}
    placeholder={placeholder}
    autoComplete={autocomplete}
    className={(touched && error ? 'error' : '')}
  />
);

export { renderField };

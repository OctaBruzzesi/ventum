import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MaterialSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const Select = ({
  input, name, label, items, disabled, meta: { touched, error },
}) => (
  <Fragment>
    <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
    <MaterialSelect
      {...input}
      disabled={disabled}
      error={Boolean(touched && error)}
      displayEmpty
      fullWidth
      name={name}
      label={label}
      className={(touched && error ? 'error' : '')}
      inputProps={{
        name,
        error,
      }}
    >
      {items.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
    </MaterialSelect>
  </Fragment>
);

export { Select };

Select.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

Select.defaultProps = {
  name: '',
  label: '',
  disabled: false,
};

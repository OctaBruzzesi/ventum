import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MaterialSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const Select = ({
  label, items, onChange, value,
}) => (
  <div style={{ flexDirection: 'column', display: 'flex' }}>
    <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
    <MaterialSelect
      displayEmpty
      onChange={onChange}
      value={value}
      label={label}
    >
      {items.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
    </MaterialSelect>
  </div>
);

export default Select;

Select.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  label: '',
};

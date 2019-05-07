import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import MaterialSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  select: {
    color: 'white',
    marginBottom: '9px',
  },
};

const Select = ({
  label, items, onChange, value, classes, color,
}) => (
  <div style={{ flexDirection: 'column', display: 'flex' }}>
    <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
    <MaterialSelect
      displayEmpty
      onChange={onChange}
      className={color === 'white' && classes.select}
      value={value}
      label={label}
      input={
        <OutlinedInput labelWidth={0} />
      }
    >
      {items.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
    </MaterialSelect>
  </div>
);

export default withStyles(styles)(Select);

Select.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  color: 'default',
  label: '',
};

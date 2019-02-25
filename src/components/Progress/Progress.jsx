import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from "@material-ui/core/styles/withStyles";

const Progress = (props) => {
  const { classes } = props;
  return (
    <CircularProgress className={classes.progress} />
  )
}

Progress.propTypes = {
  classes: PropTypes.object
}

export default withStyles(null)(Progress);
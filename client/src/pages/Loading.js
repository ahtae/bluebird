import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  ...theme.loading,
});

const Loading = ({ classes }) => {
  return (
    <div className="container">
      <div className={classes.container}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
};

export default withStyles(styles)(Loading);

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

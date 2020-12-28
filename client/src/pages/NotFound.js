import React from 'react';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  ...theme.notFound,
});

const NotFound = ({ classes }) => {
  return (
    <div className={classes.container}>
      <SentimentVeryDissatisfiedIcon color="primary" className={classes.icon} />
      <Typography color="primary" variant="h3" className={classes.pageTitle}>
        404
      </Typography>
      <Typography color="primary" variant="h5">
        Page Not Found
      </Typography>
    </div>
  );
};

export default withStyles(styles)(NotFound);

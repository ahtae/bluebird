import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import Followers from './Followers/Followers';

const styles = (theme) => ({
  paper: {
    padding: 20,
    marginTop: 30,
  },
  title: {
    textDecoration: 'underline',
  },
});

const FollowersList = ({ classes }) => {
  const user = useSelector((state) => state.data.user);
  const { followers } = user;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={styles.title}>
        Followers
      </Typography>
      <Followers followers={followers} />
    </Paper>
  );
};

export default withStyles(styles)(FollowersList);

FollowersList.propTypes = {
  classes: PropTypes.object.isRequired,
};

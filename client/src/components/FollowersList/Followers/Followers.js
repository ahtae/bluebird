import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Follower from './Follower/Follower';

const styles = (theme) => ({
  ...theme.followers,
});

const Followers = ({ classes, followers }) => {
  if (!followers.length) {
    return (
      <Typography variant="body2" className={classes.body}>
        No followers yet!
      </Typography>
    );
  }

  return (
    <div className={classes.followersContainer}>
      {followers.map((follower) => (
        <Follower key={follower.user.id} follower={follower.user} />
      ))}
    </div>
  );
};

export default withStyles(styles)(Followers);

Followers.propTypes = {
  classes: PropTypes.object.isRequired,
  followers: PropTypes.object.isRequired,
};

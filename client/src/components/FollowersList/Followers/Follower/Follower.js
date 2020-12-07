import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  ...theme.follower,
});

const Follower = ({ classes, follower }) => {
  return (
    <div>
      <Link to={`${follower.handle}`}>
        <div>
          <CardMedia
            image={follower.profilePicture}
            title="Follower Image"
            className={classes.image}
          />
        </div>
        <p>{follower.handle}</p>
      </Link>
    </div>
  );
};

export default withStyles(styles)(Follower);

Follower.propTypes = {
  classes: PropTypes.object.isRequired,
  follower: PropTypes.object.isRequired,
};

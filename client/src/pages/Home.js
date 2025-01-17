import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Typical from 'react-typical';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  ...theme.home,
});

const Home = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        <Typical
          loop={Infinity}
          wrapper="b"
          steps={[
            'Make new friends with bluebird',
            6000,
            'Meet new people with bluebird',
            6000,
          ]}
        />
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Home);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

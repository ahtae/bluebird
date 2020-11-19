import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import birdLogo from '../assets/images/bird.png';

const styles = (theme) => ({
  ...theme.navbar,
});

const NavBar = ({ classes }) => {
  return (
    <AppBar>
      <Toolbar>
        <img src={birdLogo} className={classes.logo} alt="Bird logo" />
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to="/signup"
        >
          Sign up
        </Button>
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to="/dashboard"
        >
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);

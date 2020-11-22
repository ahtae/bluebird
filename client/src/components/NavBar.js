import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import birdLogo from '../assets/images/bird.png';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../redux/actionCreators/ui';
import { withLastLocation } from 'react-router-last-location';
import { useSelector } from 'react-redux';

const styles = (theme) => ({
  ...theme.navbar,
});

const NavBar = ({ location, history, lastLocation, classes }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);
  const ui = useSelector((state) => state.ui);
  const { errors } = ui;
  const numberOfErrors = Object.keys(errors).length;

  useEffect(() => {
    if (numberOfErrors) {
      dispatch(clearErrors());
    }
  }, [dispatch, numberOfErrors, lastLocation]);

  useEffect(() => {
    if (
      (location.pathname === '/login' || location.pathname === '/signup') &&
      authenticated
    ) {
      history.push('/dashboard');
    }
  }, [authenticated, history, location]);

  return (
    <AppBar>
      <Toolbar>
        <img src={birdLogo} className={classes.logo} alt="Bird logo" />
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to="/login"
        >
          Home
        </Button>
        {!authenticated && (
          <React.Fragment>
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
            </Button>{' '}
          </React.Fragment>
        )}
        {authenticated && (
          <Button
            color="inherit"
            className={classes.button}
            component={Link}
            to="/dashboard"
          >
            Dashboard
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withLastLocation(withStyles(styles)(NavBar));

import React, { useEffect, Fragment } from 'react';
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
import {
  setAuthenticatedUserInformation,
  logOutUser,
} from '../../src/redux/actions/user';
import { setAuthenticated } from '../../src/redux/actionCreators/user';
import Badge from '@material-ui/core/Badge';

const styles = (theme) => ({
  ...theme.navbar,
});

const NavBar = ({ history, lastLocation, classes }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);
  const notifications = useSelector((state) =>
    state.user.credentials.notifications.filter(
      (notification) => !notification.isRead
    )
  );
  const token = localStorage.getItem('token');
  const userHandle = localStorage.getItem('userHandle');

  useEffect(() => {
    if (token) {
      dispatch(setAuthenticatedUserInformation(userHandle));
      dispatch(setAuthenticated());

      history.push('/dashboard');
    }
  }, [dispatch, history, token, userHandle]);

  useEffect(() => {
    dispatch(clearErrors());
  }, [lastLocation]);

  const handleLogOutClick = () => {
    dispatch(logOutUser(history));
  };

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
        {!authenticated && (
          <Fragment>
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
          </Fragment>
        )}
        {authenticated && (
          <Fragment>
            <Button
              color="inherit"
              className={classes.button}
              component={Link}
              to="/dashboard"
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              className={classes.button}
              component={Link}
              to="/notifications"
            >
              {notifications && notifications.length ? (
                <Badge
                  badgeContent={notifications.length}
                  color="secondary"
                  max={999}
                >
                  Notifications
                </Badge>
              ) : (
                'Notifications'
              )}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogOutClick}
            >
              Log out
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withLastLocation(withStyles(styles)(NavBar));

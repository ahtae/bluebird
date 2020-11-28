import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/actions/user';
import birdCageImage from '../assets/images/bird-cage.png';

const styles = (theme) => ({
  ...theme.form,
});

const SignUp = ({ history, classes }) => {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const UI = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { loading, errors } = UI;

  const clearInputValues = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setHandle('');
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    const credentials = {
      email,
      handle,
      password,
      confirmPassword,
    };

    dispatch(signupUser(credentials, history));
    clearInputValues();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="container">
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.logo} src={birdCageImage} alt="Bird logo" />
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={handleSubmitClick}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={email}
              helperText={errors.email}
              error={!!errors.email}
              onChange={handleEmailChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="handle"
              label="User handle"
              className={classes.textField}
              value={handle}
              helperText={errors.handle}
              error={!!errors.handle}
              onChange={handleHandleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              value={password}
              error={!!errors.password}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={confirmPassword}
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              onChange={handleConfirmPasswordChange}
              fullWidth
            />
            {errors.credentials ? (
              <Typography variant="body2" className={classes.customError}>
                {errors.credentials}
              </Typography>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              disabled={loading}
              type="submit"
            >
              Login
              {loading ? (
                <CircularProgress size={20} className={classes.progress} />
              ) : null}
            </Button>
            <br />
            <small>
              Already have an account? Log in <Link to="/login">here.</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
};

export default withStyles(styles)(SignUp);

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

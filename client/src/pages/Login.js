import React, { useState , useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/user';
import PropTypes from 'prop-types';
import birdCageImage from '../assets/images/bird-cage.png';
import { useLocation } from 'react-router-dom'

const styles = (theme) => ({
  ...theme.form,
});

const Login = ({ history, classes }) => {
  const location = useLocation();
  const UI = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, errors } = UI;

  const clearInputValues = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };

    dispatch(loginUser(credentials, history));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    clearInputValues()
  }, [location.pathname]);


  return (
    <div className="container">
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.logo} src={birdCageImage} alt="Bird logo" />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
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
              Don't have an account? Sign up <Link to="/signup">here.</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Login);

Login.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

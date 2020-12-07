import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import {
  Dashboard,
  Home,
  Login,
  NotFound,
  AllNotifications,
  SignUp,
  SinglePost,
  UserProfile,
} from '../src/pages';
import { NavBar, PrivateRoute } from './components';
import MuiTheme from './utils/theme';
import store from './redux/store';
import './App.css';

const theme = createMuiTheme(MuiTheme);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="bottom-right"
        >
          <Router>
            <LastLocationProvider>
              <NavBar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/users/:userHandle"
                  component={UserProfile}
                />
                <PrivateRoute
                  exact
                  path="/posts/:postId"
                  component={SinglePost}
                />
                <PrivateRoute
                  exact
                  path="/notifications"
                  component={AllNotifications}
                />
                <Route component={NotFound} />
              </Switch>
            </LastLocationProvider>
          </Router>
        </ToastProvider>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;

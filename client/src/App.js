import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { LastLocationProvider } from 'react-router-last-location';
import MuiTheme from './utils/theme';
import PrivateRoute from './components/PrivateRoute';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserProfile from './pages/UserProfile';
import { ToastProvider } from 'react-toast-notifications';
import './App.css';

const theme = createMuiTheme(MuiTheme);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="top-right"
        >
          <Router>
            <LastLocationProvider>
              <NavBar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/user/:userHandle"
                  component={UserProfile}
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

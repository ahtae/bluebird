import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.user.authenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...rest} />
      }
    />
  );
};

export default PublicRoute;

import React from 'react';
import { Route, Redirect } from 'react-router';
import { Store } from '../store';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Store.loggedIn
      ? <Component {...props} />
      : <Redirect to="/" />
  )} />
);
export default PrivateRoute;

import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/app" />
      <Route path="/app" component={App} />
    </Route>
  </BrowserRouter>
);

export default Root;

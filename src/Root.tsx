import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;

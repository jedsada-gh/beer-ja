import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import MainPage from './containers/MainPage';
import RegisterPage from './containers/RegisterPage';
import CartPage from './containers/CartPage';
import SearchPage from './containers/SearchPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route component={MainPage} />
      </Switch>
    </div>
  );
}

export default Routes;

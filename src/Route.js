import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './container/LoginPage';
import MainPage from './container/MainPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={MainPage} />
      </Switch>
    </div>
  );
}

export default Routes;
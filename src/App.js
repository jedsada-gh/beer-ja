import React, { Component } from 'react';
import './App.css';
import LoginPage from './container/LoginPage'
import Route from './Route'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route />
      </div>
    );
  }
}

export default App;

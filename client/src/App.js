import './App.css';
import React, { Component } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login'
import {Switch, BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path ='/login' component={Login}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

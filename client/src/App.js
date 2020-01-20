import './App.css';
import React, { Component } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login'
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import get_criminal from './components/get_criminal'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path ='/login' component={Login}/>
            <Route exact path ='/login/get_criminal' component={get_criminal}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

import './App.css';
import React, { Component } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login'
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import get_criminal from './components/get_criminal'
import add_criminal from './components/add_criminal'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path ='/login' component={Login}/>
            <Route exact path ='/login/get_criminal' component={get_criminal}/>
            <Route exact path ='/login/add_criminal' component={add_criminal}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

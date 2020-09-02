import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/page_components/Home';
import './components/assets/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';



export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    );
  }
}

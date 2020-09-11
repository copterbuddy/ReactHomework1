//components
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/page_components/Home';
import ProductDetail from './components/page_components/ProductDetail'
import SkuSummaryComponent from './components/page_components/SkuSummary';
import SkuAddressComponent from './components/page_components/SkuAddress'

//script
import './components/assets/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/assets/index'

class App extends React.Component {
  displayName = App.name

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} ></Route>
        <Route exact path='/product-detail' component={ProductDetail} ></Route>
        <Route exact path='/sku-summary' component={SkuSummaryComponent} ></Route>
        <Route exact path='/sku-address' component={SkuAddressComponent} ></Route>
      </Switch>
    );
  }
}

export default App
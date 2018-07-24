import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from './Components/Header';
import Code from './View/Code';
import Home from './Components/Home';

export default class Main extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Route path="/qa" component={Home} />
        <Route path="/code" component={Code} />
      </Fragment>
    );
  }
}

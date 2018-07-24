import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './Main';
import Home from './View/Home';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/qa" component={Main} />
    </div>
  </Router>
);
export default App;

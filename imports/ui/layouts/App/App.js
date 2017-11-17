/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Index from '../../pages/Index/Index';

import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';

import './App.scss';

const App = () => (
  <Router>
    <div className="App">
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
      <Footer />
    </div>
  </Router>
);

export default App;

/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
import LikesCollection from '../../../api/Likes/Likes';

import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';

import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? (
      <div className="App">
        <Navigation {...props} />
        <Grid>
          <Switch>
            <Route exact name="index" path="/" component={Index} />
            <Public path="/signup" component={Signup} {...props} />
            <Public path="/login" component={Login} {...props} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
        <Footer />
      </div>
    ) : (
      ''
    )}
  </Router>
);

App.defaultProps = {
  userId: ''
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  authenticated: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.username;
  const subscription = Meteor.subscribe('likes');

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    likesLoading: !subscription.ready(),
    likes: LikesCollection.find().fetch()
  };
})(App);

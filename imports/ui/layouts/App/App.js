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
import Authenticated from '../../components/Authenticated/Authenticated';
import Index from '../../pages/Index/Index';
import Hot from '../../pages/Hot/Hot';
import Likes from '../../pages/Likes/Likes';
import LikesCollection from '../../../api/Likes/Likes';

import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';

import NotFound from '../../pages/NotFound/NotFound';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? (
      <div className="App">
        <Navigation {...props} />
        <Grid>
          <Switch>
            <Public exact name="index" path="/" component={Index} {...props} />
            <Authenticated exact path="/hot" component={Hot} {...props} />
            <Authenticated exact path="/likes" component={Likes} {...props} />
            <Public path="/signup" component={Signup} {...props} />
            <Public path="/login" component={Login} {...props} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
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
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const subscription = Meteor.subscribe('likes');

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    likesLoading: !subscription.ready(),
    likes: LikesCollection.find().fetch()
  };
})(App);

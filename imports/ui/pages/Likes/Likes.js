import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Alert } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';
import Post from '../../components/Post/Post';
import Loading from '../../components/Loading/Loading';

class Likes extends Component {
  handleFavoriteClick = item => {
    Meteor.call('likes.remove', item._id, error => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  };
  render() {
    const { likesLoading, likes } = this.props;
    return !likesLoading ? (
      <div className="Likes container-fluid">
        <div className="page-header clearfix">
          <h4 className="pull-left header">Your Likes</h4>
        </div>
        {likes.length ? (
          <CSSTransitionGroup
            className="likes"
            component="div"
            transitionName="likes"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {likes.map(item => (
              <Post key={item._id} item={item} onClick={this.handleFavoriteClick} isFavorite="favorite" />
            ))}
          </CSSTransitionGroup>
        ) : (
          <Alert bsStyle="warning">No likes yet!</Alert>
        )}
      </div>
    ) : (
      <Loading />
    );
  }
}

Likes.propTypes = {
  likesLoading: PropTypes.bool.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Likes;

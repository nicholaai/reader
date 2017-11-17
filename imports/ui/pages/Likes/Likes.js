import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Alert } from 'react-bootstrap';
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
      <div className="Likes">
        <div className="page-header clearfix">
          <h4 className="pull-left">Your Likes</h4>
        </div>
        {likes.length ? (
          <div>
            {likes.map(item => (
              <Post key={item._id} item={item} onClick={this.handleFavoriteClick} isFavorite="favorite" />
            ))}
          </div>
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

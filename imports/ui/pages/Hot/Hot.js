import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import Post from '../../components/Post/Post';
import Loading from '../../components/Loading/Loading';
import enums from '../../../modules/enums';
import isFavItem from '../../../modules/isFavItem';

class Hot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      redditLoading: true,
      after: '',
      before: '',
      count: enums.itemsPerPage
    };
  }

  componentDidMount = () => {
    fetch(`${enums.redditHotUrl}`)
      .then(res => res.json())
      .then(data => {
        const state = { ...this.state };
        const redditData = data.data;
        state.items = _.pluck(redditData.children, 'data');
        state.redditLoading = false;
        state.after = redditData.after;
        this.setState({ ...state });
      });
  };

  handleClick = e => {
    const tmpCount = parseInt(e.target.value, 10);
    const action = e.target.id;
    const queryDirection = action === 'after' ? `after=${this.state.after}` : `before=${this.state.before}`;

    fetch(`${enums.redditHotUrl}?count=${tmpCount}&${queryDirection}`)
      .then(res => res.json())
      .then(data => {
        const state = { ...this.state };
        const redditData = data.data;
        state.items = _.pluck(redditData.children, 'data');
        state.after = redditData.after;
        state.before = redditData.before;
        state.count = action === 'after' ? state.count + enums.itemsPerPage : state.count - enums.itemsPerPage;
        this.setState({ ...state });
        window.scrollTo(0, 0);
      });
  };

  isSelected = (item, likes) => (isFavItem(item, likes) ? 'favorite' : '');

  handleFavoriteClick = item => {
    const { likes } = this.props;
    const existingLike = isFavItem(item, likes);
    let methodToCall;
    let doc;
    if (existingLike) {
      doc = existingLike._id;
      methodToCall = 'likes.remove';
    } else {
      doc = {
        title: item.title,
        link: item.permalink,
        numComments: item.num_comments,
        thumbnail: item.thumbnail,
        redditId: item.id
      };
      methodToCall = 'likes.insert';
    }

    Meteor.call(methodToCall, doc, error => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  };

  render() {
    const { likesLoading, likes } = this.props;
    const { items, count } = this.state;
    return !likesLoading && !this.state.redditLoading ? (
      <div className="Likes">
        <div className="page-header clearfix">
          <h4 className="pull-left">What&#39;s Hot</h4>
        </div>
        {items.map(item => (
          <Post
            key={item.id}
            item={item}
            onClick={this.handleFavoriteClick}
            isFavorite={this.isSelected(item, likes)}
          />
        ))}
        {count > enums.itemsPerPage && (
          <Button id="before" onClick={this.handleClick} value={this.state.count - 24}>
            Prev
          </Button>
        )}
        <Button id="after" onClick={this.handleClick} value={this.state.count}>
          Next
        </Button>
      </div>
    ) : (
      <Loading />
    );
  }
}

Hot.propTypes = {
  likesLoading: PropTypes.bool.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Hot;

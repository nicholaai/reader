import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import enums from '../../../modules/enums';

import './Post.scss';

class Post extends Component {
  handleClick = () => {
    this.props.onClick(this.props.item);
  };
  render() {
    const { id, title, permalink, thumbnail } = this.props.item;
    const { isFavorite } = this.props;
    const redditLink = enums.redditUrl + permalink;

    return (
      <div key={id}>
        <Button onClick={this.handleClick} value={id} className={isFavorite}>
          Add
        </Button>
        <a href={redditLink} target="_blank">
          {title}
        </a>
        <img src={thumbnail} alt={title} />
      </div>
    );
  }
}

Post.propTypes = {
  isFavorite: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Post;

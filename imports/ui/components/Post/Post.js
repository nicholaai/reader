/* eslint-disable camelcase */

import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import enums from '../../../modules/enums';
import setThumbnail from '../../../modules/setThumbnail';

import './Post.scss';

class Post extends Component {
  handleClick = () => {
    this.props.onClick(this.props.item);
  };
  render() {
    // reddit stores comments in snake case, my schema is camel case
    const { title, permalink, thumbnail, numComments, num_comments } = this.props.item;
    const { isFavorite } = this.props;
    return (
      <Row className="post">
        <Col sm={2} xsHidden>
          <div className="post-img-container">
            <a href={enums.redditUrl + permalink} target="_blank">
              <img src={setThumbnail(thumbnail)} alt={title} className="post-img" />
            </a>
          </div>
        </Col>
        <Col className="post-text-container" sm={8} xs={10} smPush={0} xsPush={2}>
          <a href={enums.redditUrl + permalink} target="_blank" className="post-text">
            {title}
          </a>
          <p className="post-comments">{num_comments || numComments} comments</p>
        </Col>
        <Col xs={2} smPull={0} xsPull={10} className="text-center">
          <button onClick={this.handleClick} className={`${isFavorite} heart post-fav`} />
        </Col>
      </Row>
    );
  }
}

Post.propTypes = {
  isFavorite: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    numComments: PropTypes.number,
    num_comments: PropTypes.number,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
};

export default Post;

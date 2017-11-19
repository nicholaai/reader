import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import enums from '../../../modules/enums';

import './PaginationBtns.scss';

class PaginationBtns extends Component {
  handleClick = e => {
    this.props.onClick(e);
  };
  render() {
    const { count } = this.props;
    return (
      <Row className="post pag-row">
        <Col xs={12}>
          {count > enums.itemsPerPage && (
            <button id="before" onClick={this.handleClick} value={count - 24} className="pag-btn">
              Previous
            </button>
          )}
          <button id="after" onClick={this.handleClick} value={count} className="pag-btn">
            Next
          </button>
        </Col>
      </Row>
    );
  }
}

PaginationBtns.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PaginationBtns;

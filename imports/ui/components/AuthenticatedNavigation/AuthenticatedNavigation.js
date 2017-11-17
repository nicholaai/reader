import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class AuthenticatedNavigation extends Component {
  handleClick = () => {
    const { history } = this.props;
    Meteor.logout();
    history.push('/');
  };

  render() {
    const { name } = this.props;
    return (
      <div>
        <Nav>
          <LinkContainer to="/hot">
            <NavItem eventKey={1} href="/hot">
              Hot
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/likes">
            <NavItem eventKey={2} href="/likes">
              Likes
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={name} id="user-nav-dropdown">
            <MenuItem eventKey={3.2} onClick={this.handleClick}>
              Logout
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(AuthenticatedNavigation);

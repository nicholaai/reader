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

  // a default profile picture is used here, in prod would be actual user img
  render() {
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
          <NavDropdown eventKey={3} title={<img src="/profPic.jpg" alt="profile pic" />} id="user-nav-dropdown">
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
  history: PropTypes.object.isRequired
};

export default withRouter(AuthenticatedNavigation);

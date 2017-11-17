import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        }
      },
      messages: {
        username: {
          required: 'Need an username here.'
        },
        password: {
          required: 'Need a password here.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  handleSubmit() {
    Meteor.loginWithPassword(this.username.value, this.password.value, error => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header">Log In</h4>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <input
                  type="text"
                  name="username"
                  ref={username => (this.username = username)}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="clearfix">
                  <span className="pull-left">Password</span>
                </ControlLabel>
                <input
                  type="password"
                  name="password"
                  ref={password => (this.password = password)}
                  className="form-control"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">
                Log In
              </Button>
              <AccountPageFooter>
                <p>
                  {"Don't have an account?"} <Link to="/signup">Sign Up</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;

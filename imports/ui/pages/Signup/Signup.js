import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';

class Signup extends React.Component {
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
          required: true,
          minlength: 6
        }
      },
      messages: {
        username: {
          required: 'Need an username here.'
        },
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.'
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  handleSubmit() {
    Accounts.createUser(
      {
        username: this.username.value,
        password: this.password.value
      },
      error => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Welcome!', 'success');
        }
      }
    );
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header">Sign Up</h4>
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
                <ControlLabel>Password</ControlLabel>
                <input
                  type="password"
                  name="password"
                  ref={password => (this.password = password)}
                  className="form-control"
                />
                <InputHint>Use at least six characters.</InputHint>
              </FormGroup>
              <Button type="submit" bsStyle="success">
                Sign Up
              </Button>
              <AccountPageFooter>
                <p>
                  Already have an account? <Link to="/login">Log In</Link>.
                </p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Signup;

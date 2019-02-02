import React, { Component } from 'react';
import { Form, Button, Input, Icon, message } from 'antd';
import { auth } from '../firebase';

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onEmailChange = event => {
    const email = event.target.value;
    this.setState({ email });
  };

  onPasswordChange = event => {
    const password = event.target.value;
    this.setState({ password });
  };

  onSubmitFormRegister = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const email = this.state.email;
    const password = this.state.password;
    const isEailValid = this.validateEmail(email);
    if (isEailValid) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ isLoading: false });
          message.success('Successfully', 3, () => {
            this.props.history.push('/');
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
          message.error(err.message, 3);
        });
    } else {
      this.setState({ isLoading: false });
      message.error('Email invalid!', 1);
    }
  };

  render() {
    return (
      <div style={{ width: '30%', margin: '0 auto' }}>
        <h1>Register</h1>

        <Form onSubmit={this.onSubmitFormRegister}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Email"
              onChange={this.onEmailChange}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: '44%' }}
              htmlType="submit"
              type="primary"
              loading={this.state.isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RegisterPage;

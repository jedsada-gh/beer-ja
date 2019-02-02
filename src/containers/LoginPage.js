import React, { Component } from 'react';
import { auth, provider } from '../firebase';
import { Form, Button, Input, Icon, Divider, message, Modal } from 'antd';

class LoginPage extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
    isShowModal: false,
    isLogin: false,
    imageUrl: ''
  };

  componentDidMount() {
    const jsonStr = localStorage.getItem('user-data');
    const isLoggedIn = jsonStr && JSON.parse(jsonStr).isLoggedIn;
    if (isLoggedIn) {
      this.navigateToMainPage();
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  saveInformationUser = email => {
    localStorage.setItem(
      'user-data',
      JSON.stringify({
        email: email,
        isLoggedIn: true,
        imageUrl: this.state.imageUrl
      })
    );
    this.setState({ isLoading: false });
    this.navigateToMainPage();
  };

  onEmailChange = event => {
    const email = event.target.value;
    this.setState({ email });
  };

  onPasswordChange = event => {
    const password = event.target.value;
    this.setState({ password });
  };

  onClickLoginWithFacebook = () => {
    this.setState({ isLoading: true });
    auth.signInWithPopup(provider).then(({ user }) => {
      this.setState({ imageUrl: `${user.photoURL}?height=500` });
      this.saveInformationUser(user.email);
    });
  };

  navigateToMainPage = () => {
    const { history } = this.props;
    history.push('/home');
  };

  onSubmitFormLogin = e => {
    e.preventDefault();
    this.setState({ isLogin: true });
    const email = this.state.email;
    const password = this.state.password;
    const isEailValid = this.validateEmail(email);
    if (isEailValid) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          this.setState({ isLogin: false });
          this.saveInformationUser(user.email);
        })
        .catch(_ => {
          this.setState({ isLogin: false });
          this.setState({ isShowModal: true });
        });
    } else {
      this.setState({ isLogin: false });
      message.error('Email or Password invalid!', 1);
    }
  };

  handleCancel = () => {
    this.setState({ isShowModal: false, isLogin: false });
  };

  handleOk = () => {
    this.setState({ isShowModal: false, isLogin: false });
    this.props.history.push('/register');
  };

  render() {
    return (
      <div style={{ width: '30%', margin: '0 auto' }}>
        <h1>Welcome to Beer Ja</h1>

        <Form onSubmit={this.onSubmitFormLogin}>
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
              loading={this.state.isLogin}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <Button
          type="primary"
          icon="facebook"
          loading={this.state.isLoading}
          onClick={this.onClickLoginWithFacebook}
        >
          Login With Facebook
        </Button>

        <Modal
          title="Something went wrong"
          visible={this.state.isShowModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Yes
            </Button>
          ]}
        >
          <p>Sorry! not found this account but you want to create account.</p>
        </Modal>
      </div>
    );
  }
}

export default LoginPage;

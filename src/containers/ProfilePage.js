import React, { Component } from 'react';
import { Button, Avatar } from 'antd';

class ProfilePage extends Component {
  state = {
    email: '',
    isLoading: false,
    imageUrl: ''
  };

  componentDidMount() {
    const jsonStr = localStorage.getItem('user-data');
    const email = jsonStr && JSON.parse(jsonStr).email;
    var imageUrl = jsonStr && JSON.parse(jsonStr).imageUrl;
    if (!imageUrl) {
      imageUrl = 'https://icons-for-free.com/free-icons/png/512/1902268.png';
    }
    this.setState({ email, imageUrl });
  }

  onClickLogout = () => {
    this.setState({ isLoading: true });
    localStorage.setItem(
      'user-data',
      JSON.stringify({
        isLoggedIn: false
      })
    );
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.props.history.push('/');
    }, 2000);
  };

  render() {
    return (
      <div
        style={{
          padding: '16px',
          marginTop: 64,
          minHeight: '600px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <div>
          <Avatar size="large" src={this.state.imageUrl} />
          <h3>Email: {this.state.email}</h3>
          <Button
            type="primary"
            loading={this.state.isLoading}
            onClick={this.onClickLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

export default ProfilePage;

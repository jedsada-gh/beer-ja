import React, { Component } from 'react';
import { Button } from 'antd';

class ProfilePage extends Component {
  state = {
    email: '',
    isLoading: false
  };

  componentDidMount() {
    const jsonStr = localStorage.getItem('user-data');
    const email = jsonStr && JSON.parse(jsonStr).email;
    this.setState({ email });
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
      <div>
        <h1>Email: {this.state.email}</h1>
        <Button
          type="primary"
          loading={this.state.isLoading}
          onClick={this.onClickLogout}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default ProfilePage;

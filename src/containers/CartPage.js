import React, { Component } from 'react';
import ListCart from '../components/cart/list';
import { Button, message } from 'antd';

class CartPage extends Component {
  state = {
    items: [],
    email: '',
    isDisable: true
  };

  componentDidMount() {
    const jsonStr = localStorage.getItem('user-data');
    const email = jsonStr && JSON.parse(jsonStr).email;
    this.setState({ email });
    const jsonCartStr = localStorage.getItem(`beer-ja-list-cart-${email}`);
    if (jsonCartStr) {
      const items = jsonCartStr && JSON.parse(jsonCartStr);
      if (items.length > 0) {
        this.setState({ items: items, isDisable: false });
      }
    }
  }

  onClickCheckout = () => {
    localStorage.setItem(
      `beer-ja-list-cart-${this.state.email}`,
      JSON.stringify([])
    );
    this.setState({ items: [], isDisable: true });
    message.success('You checkout successfully', 1, () => {
      this.props.history.replace('/');
    });
  };

  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          minHeight: '600px'
        }}
      >
        <div
          style={{ width: '100vw', background: 'gray', position: 'relative' }}
        >
          <h1 style={{ color: 'white', padding: '10px' }}>Your Cart</h1>
          <Button
            disabled={this.state.isDisable}
            type="primary"
            style={{
              position: 'absolute',
              top: '50%',
              right: '46px',
              transform: 'translateY(-50%)'
            }}
            onClick={this.onClickCheckout}
          >
            Checkout
          </Button>
        </div>
        <ListCart items={this.state.items} />
      </div>
    );
  }
}

export default CartPage;

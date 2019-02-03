import React, { Component } from 'react';
import { Spin } from 'antd';
import ListBeer from '../components/beer/list';

class BeerPage extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=40')
      .then(response => response.json())
      .then(items => this.setState({ items }));
  }

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
        {this.state.items.length > 0 ? (
          <ListBeer items={this.state.items} />
        ) : (
          <Spin size="large" />
        )}
      </div>
    );
  }
}

export default BeerPage;

import React, { Component } from 'react';
import { Spin, Pagination } from 'antd';
import ListBeer from '../components/beer/list';

class BeerPage extends Component {
  state = {
    items: [],
    page: 1,
    perPage: 40,
    isLoading: true
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    fetch(
      `https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=${
        this.state.perPage
      }`
    )
      .then(response => response.json())
      .then(items => this.setState({ items, isLoading: false }));
  };

  onSelectPage = (page, pageSize) => {
    this.setState({ page, perPage: pageSize }, () => {
      this.loadData();
    });
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
        {!this.state.isLoading ? (
          <div>
            <ListBeer items={this.state.items} />
            <br />
            <Pagination
              total={240}
              pageSize={40}
              defaultCurrent={this.state.page}
              onChange={this.onSelectPage}
            />
          </div>
        ) : (
          <Spin size="large" />
        )}
      </div>
    );
  }
}

export default BeerPage;

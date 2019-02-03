import React, { Component } from 'react';
import { List } from 'antd';
import BeerItem from '../beer/item';

class ListFavorite extends Component {
  render() {
    return (
      <div style={{ minHeight: '300px' }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.props.items}
          renderItem={item => (
            <List.Item>
              <BeerItem item={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ListFavorite;

import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Input } from 'antd';

const API_KEY = 'qK7M9qsy2JdMnUReGCfR8J1tXnKYKPci';

class SearchPage extends Component {
  state = {
    itemSize: 0
  };

  onTextChange = e => {
    const value = e.target.value;
    this.setState({ value }, () => {
      this.searchGiphybyText();
    });
  };

  searchGiphybyText = () => {
    const word = this.state.value;
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${word}&limit=100&lang=en`
    )
      .then(response => response.json())
      .then(items => {
        console.log(`items: ${JSON.stringify(items.data, null, 2)}`);
        this.setState({ itemSize: items.data.length });
      });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ width: '50%' }}>
          <DebounceInput
            element={Input}
            debounceTimeout={500}
            onChange={this.onTextChange}
          />
          <br />
          <br />
          <p>{`found ${this.state.itemSize} items`}</p>
        </div>
      </div>
    );
  }
}

export default SearchPage;

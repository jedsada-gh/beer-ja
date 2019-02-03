import React, { Component } from 'react';
import ListFavorite from '../components/favorite/list';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isShowDialog: state.isShowDialog
  };
};

class FavoritePage extends Component {
  getItems = () => {
    const jsonStr = localStorage.getItem('user-data');
    const email = jsonStr && JSON.parse(jsonStr).email;
    const jsonFavStr = localStorage.getItem(`beer-ja-list-fav-${email}`);
    if (jsonFavStr) {
      const items = jsonFavStr && JSON.parse(jsonFavStr);
      return items;
    }
  };

  render() {
    console.log(this.props.isShowDialog);
    return (
      <div
        style={{
          padding: '16px',
          marginTop: 64,
          minHeight: '600px'
        }}
      >
        <ListFavorite items={this.getItems()} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(FavoritePage);

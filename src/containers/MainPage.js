import React, { Component } from 'react';
import { Layout, Menu, Modal, Button, message, Badge, Icon } from 'antd';
import RouteMenu from './RouteMenu';
import { connect } from 'react-redux';

const { Header, Content, Footer } = Layout;
const menus = ['home', 'favorite', 'profile'];

const mapStateToProps = state => {
  return {
    isShowDialog: state.isShowDialog,
    itemBeer: state.itemBeer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDismissDialog: () =>
      dispatch({
        type: 'dismiss_dialog'
      }),
    onItemMovieClick: item =>
      dispatch({
        type: 'click_item',
        payload: item
      })
  };
};

class MainPage extends Component {
  state = {
    items: [],
    currentMenu: menus[0],
    email: '',
    favItems: [],
    cartItems: []
  };

  componentDidMount() {
    const jsonStr = localStorage.getItem('user-data');
    const email = jsonStr && JSON.parse(jsonStr).email;
    const { pathname } = this.props.location;
    var currentMenu = menus[0];
    if (pathname != '/') {
      currentMenu = pathname.replace('/', '');
      if (!menus.includes(currentMenu)) currentMenu = menus[0];
    }
    const jsonFavStr = localStorage.getItem(`beer-ja-list-fav-${email}`);
    if (jsonFavStr) {
      const items = jsonFavStr && JSON.parse(jsonFavStr);
      this.setState({ favItems: items });
    }
    const jsonCartStr = localStorage.getItem(`beer-ja-list-cart-${email}`);
    if (jsonCartStr) {
      const cartItems = jsonCartStr && JSON.parse(jsonCartStr);
      this.setState({ cartItems: cartItems });
    }
    this.setState({ currentMenu, email });
  }

  onMenuClick = e => {
    if (e.key) {
      var path = '/';
      path = `/${e.key}`;
      this.props.history.replace(path);
    }
  };

  onClickFavoriteItem = () => {
    const items = this.state.favItems;
    const itemFav = this.props.itemBeer;
    const index = items.findIndex(item => {
      return item.name === itemFav.name;
    });
    if (index != -1) {
      items.splice(index, 1);
      localStorage.setItem(
        `beer-ja-list-fav-${this.state.email}`,
        JSON.stringify(items)
      );
      message.success('unfavorite this item successfully', 1, () => {
        this.setState({ favItems: items });
        this.onModalClickCancel();
      });
    } else {
      items.push(itemFav);
      localStorage.setItem(
        `beer-ja-list-fav-${this.state.email}`,
        JSON.stringify(items)
      );
      message.success('Saved your favorite this item', 1, () => {
        this.setState({ favItems: items });
        this.onModalClickCancel();
      });
    }
  };

  onClickAddToCart = () => {
    const items = this.state.cartItems;
    const itemCart = this.props.itemBeer;
    items.push(itemCart);
    localStorage.setItem(
      `beer-ja-list-cart-${this.state.email}`,
      JSON.stringify(items)
    );
    message.success('Added to your cart', 1, () => {
      this.setState({ cartItems: items });
      this.onModalClickCancel();
    });
  };

  onModalClickCancel = () => {
    this.props.onDismissDialog();
  };

  checkItemFavorited = () => {
    const items = this.state.favItems;
    const itemBeer = this.props.itemBeer;
    const result = items.find(item => {
      return item.name === itemBeer.name;
    });
    if (result) {
      return 'primary';
    } else {
      return '';
    }
  };

  navigateToCart = () => {
    this.props.history.replace('/cart');
  };

  render() {
    const itemBeer = this.props.itemBeer;
    return (
      <div>
        <div style={{ height: '100vh' }}>
          {' '}
          <Layout className="layout" style={{ background: 'white' }}>
            <Header
              style={{
                padding: '0px',
                position: 'fixed',
                zIndex: 1,
                width: '100%'
              }}
            >
              <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={[this.state.currentMenu]}
                style={{ lineHeight: '64px', position: 'relative' }}
                onClick={e => {
                  this.onMenuClick(e);
                }}
              >
                <Menu.Item key={menus[0]}>Home</Menu.Item>
                <Menu.Item key={menus[1]}>Favorite</Menu.Item>
                <Menu.Item key={menus[2]}>Profile</Menu.Item>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '46px',
                    transform: 'translateY(-40%)'
                  }}
                >
                  <Badge
                    count={this.state.cartItems.length}
                    overflowCount={10}
                    onClick={this.navigateToCart}
                  >
                    <Icon type="shopping-cart" style={{ fontSize: '30px' }} />
                  </Badge>
                </div>
              </Menu>
            </Header>
            <Content>
              <RouteMenu items={this.state.items} />
            </Content>
            <Footer style={{ textAlign: 'center', background: 'white' }}>
              BeerJa Application Workshop @ CAMT
            </Footer>
          </Layout>
        </div>

        {itemBeer != null ? (
          <div>
            <Modal
              width="40%"
              style={{ maxHeight: '70%' }}
              title={itemBeer.name}
              visible={this.props.isShowDialog}
              onCancel={this.onModalClickCancel}
              footer={[
                <Button
                  key="submit"
                  type={this.checkItemFavorited()}
                  icon="heart"
                  size="large"
                  shape="circle"
                  onClick={this.onClickFavoriteItem}
                />,
                <Button
                  key="submit"
                  type="primary"
                  icon="shopping-cart"
                  size="large"
                  shape="circle"
                  onClick={this.onClickAddToCart}
                />
              ]}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}
              >
                <img
                  src={itemBeer.image_url}
                  style={{ height: '200px', width: 'auto' }}
                />
              </div>
              <p>
                <b>Tagline:</b> {itemBeer.tagline}
              </p>
              <p>
                <b>First Brewed:</b> {itemBeer.first_brewed}
              </p>
              <p>
                <b>Description:</b> {itemBeer.description}
              </p>
              <p>
                <b>Brewers Tips:</b> {itemBeer.brewers_tips}
              </p>
              <p>
                <b>Contributed by:</b> {itemBeer.contributed_by}
              </p>
            </Modal>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

import React, { Component } from 'react';
import { Layout, Menu, Modal, Button } from 'antd';
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
    currentMenu: menus[0]
  };

  componentDidMount() {
    const { pathname } = this.props.location;
    var currentMenu = menus[0];
    if (pathname != '/') {
      currentMenu = pathname.replace('/', '');
      if (!menus.includes(currentMenu)) currentMenu = menus[0];
    }
    this.setState({ currentMenu });
  }

  onMenuClick = e => {
    var path = '/';
    path = `/${e.key}`;
    this.props.history.replace(path);
  };

  onClickFavoriteItem = () => {
    this.props.onDismissDialog();
  };

  onClickBuyItem = () => {
    this.props.onDismissDialog();
  };

  onModalClickCancel = () => {
    this.props.onDismissDialog();
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
                style={{ lineHeight: '64px' }}
                onClick={e => {
                  this.onMenuClick(e);
                }}
              >
                <Menu.Item key={menus[0]}>Home</Menu.Item>
                <Menu.Item key={menus[1]}>Favorite</Menu.Item>
                <Menu.Item key={menus[2]}>Profile</Menu.Item>
              </Menu>
            </Header>
            <Content
              style={{
                padding: '16px',
                marginTop: 64,
                minHeight: '600px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
              }}
            >
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
                  type="primary"
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
                  onClick={this.onClickBuyItem}
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

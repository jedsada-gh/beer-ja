import React, { Component } from 'react';
import { Spin, Layout, Menu } from 'antd';
import RouteMenu from './RouteMenu';

const { Header, Content, Footer } = Layout;
const menus = ['home', 'favorite', 'profile'];

class MainPage extends Component {
  state = {
    items: [],
    currentMenu: menus[0]
  };

  componentDidMount() {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=40')
      .then(response => response.json())
      .then(items => this.setState({ items }));

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

  render() {
    return (
      <div>
        {this.state.items.length > 0 ? (
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
        ) : (
          <Spin size="large" />
        )}
      </div>
    );
  }
}

export default MainPage;

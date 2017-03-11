import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Router, Link } from 'dva/router';
import styles from './MainLayout.less';

const { Header, Sider, Content } = Layout;

class MainLayout extends Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    const { children } = this.props;
    return (
      <Layout className={styles.layout}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="home">
                <Icon type="pie-chart" />
                <span className="nav-text">工作台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="users">
                <Icon type="user" />
                <span className="nav-text">用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="services">
                <Icon type="video-camera" />size
                <span className="nav-text">服务列表</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle} />
          </Header>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  // Injected by React Router
  children: PropTypes.node // eslint-disable-line
};


export default MainLayout;

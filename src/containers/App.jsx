import React, { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router';


class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { children } = this.props
    return (
      <div>
        <h2>APP</h2>
        <Link to="home">首页</Link>&emsp;&emsp;
        <Link to="services">用户列表</Link>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
}

export default App;

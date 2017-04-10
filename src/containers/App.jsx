import React, { Component, PropTypes } from 'react'
import { Router, Link } from 'dva/router';
import MainLayout from '../layout/MainLayout'
import '../styles'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children, location } = this.props
    return (
      <MainLayout location={location}>
        {children}
      </MainLayout>
    )
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node // eslint-disable-line
}

export default App;

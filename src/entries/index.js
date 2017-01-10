import './index.html';
import './index.less';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { browserHistory, hashHistory } from 'react-router';
import Routes from "../routes/index"
import store from "../store";
// store.dispatch(getAllProducts())

render(
  <Provider store={store}>
    <Routes history={hashHistory} />
  </Provider>,
document.getElementById('root'))

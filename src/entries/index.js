import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import 'antd/dist/antd.less';
import Routes from '../routes'
import Models from '../models'
// import { message } from 'antd';
import './index.html';
import './index.less';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // history: browserHistory,
  onError(e) {
    console.log(e.message);
    // message.error(e.message, ERROR_MSG_DURATION);
  }
});

// 2. Plugins
app.use(createLoading());
// app.use();

// 3. Model
Object.keys(Models).forEach((item) => {
  app.model(Models[item]);
})
// Moved to router.js

// 4. Router
app.router(Routes);

// 5. Start
app.start('#root');

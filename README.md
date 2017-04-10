# react-example
react/and + dva脚手架，使用roadhog编译构，对各种框架/规范/风格进行整合。项目的目标为开箱即用的脚手架。

## 环境准备
-   安装nodejs最新版本（当前2017-01-09为v6.9.0），可以使用淘宝镜像服务下载安装（https://npm.taobao.org/）
-   安装cnpm ```npm install -g cnpm --registry=https://registry.npm.taobao.org```
-   clone本项目代码 ```git clone git@github.com:enpenguc/react-example.git ```
-   安装依赖 ``` cnpm install ```


## 开发调试

```bash
# 启动开发环境
npm start
# 浏览器打开 http://127.0.0.1:8989
```

## 编译发布

```bash
# 发布编译
npm run build
```
### 脚手架整合说明

- redux-devTool：建议chrome安装次插件，脚手架入口配置，在开发调试模式启用次扩展插件
- Performance Tools：开发调试模式下引入react性能调试，详细见https://facebook.github.io/react/docs/perf.html
- 引入[isomorphic-fetch](https://travis-ci.org/matthew-andrews/isomorphic-fetch)，封装xfetch,输出xfetch及get/post等请求方法。 统一异常及逻辑错误处理，session超时重新登陆处理，以及sofa 3在get请求中文乱码问题。详细见./src/util/xfetch.js
- dva错误统一处理
- 引入dva-loading插件，完美处理异步处理loading
- 提供后端服务接口统一常量化配置示例：./src/constants/api.js
- 提供异步service请求示例：./src/api/service.js
- 提供异步service请求示例：./src/api/service.js
- 提供dva的model示例：./src/models/service.js
- 提供components示例：./src/containers/Services.jsx
- 引入reselect，处理connect数据缓存处理，提高性能（示例即将补充）
- 进入[normalizr](https://github.com/paularmstrong/normalizr)，进行数据范式化处理，扁平化数据（示例即将补充）
- 引入airbnb，使用airbnb代码风格，配置.eslintrc校验代码风格，详细见https://github.com/airbnb/javascript（建议使用atom开发）
- 引入editorconfig，配置.editorconfig，统一IDE编辑器格式话风格

### 参考

- react：https://facebook.github.io/react/docs/hello-world.html
- redux：http://redux.js.org/
- redux-saga：http://leonshi.com/redux-saga-in-chinese/docs/api/index.html
- dva：https://github.com/dvajs/dva
- dva小知识：https://github.com/dvajs/dva-knowledgemap
- es6：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
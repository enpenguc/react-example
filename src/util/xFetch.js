// https://github.com/github/fetch
// https://travis-ci.org/matthew-andrews/isomorphic-fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import qs from 'qs';
import { Modal, message } from 'antd';

const errorMessages = res => `${res.status} ${res.statusText}`;

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const {
    success,
    successful,
    msg
  } = res.jsonResult;
  if (!success && !successful) {
    // Message.error( msg);
    return Promise.reject(msg || '系统发生错误，未返回错误信息。');
  }
  return res;
}

// 请求超时，等待登录后重新执行的函数
let waitFetchList = [];
// 登录
function toLogin(resolve, reject) {
  waitFetchList.push({
    resolve,
    reject
  });
  if (waitFetchList.length < 2) {
    Modal.confirm({
      title: '您的登录已超时，是否要在新窗口中重新登录？',
      content: '登录成功后，会自动继续执行当前的操作请求。',
      onOk() {
        window.checkLoginFunction = function loginSuccess() {
          message.success('登录成功，执行之前的请求...');
          waitFetchList.forEach((item) => {
            try {
              item.resolve();
            } catch (e) {
              console.log(e);  //eslint-disable-line
            }
          });
          waitFetchList = [];
        };
        window.open('/tologin.htm', '_black');
      },
      onCancel() {
        waitFetchList = [];
      }
    });
  }
}


function xFetch(url2, options) {
  let absoluteUrl = url2;
  const opts = {
    ...options,
    mode: 'cors',
    credentials: 'include',
    // 配置headers，添加会话认证等
    headers: {
      ...(options ? options.headers : {}),
      'Upgrade-Insecure-Requests': '1',
      'Access-Control-Allow-Origin': 'https://login-test.alibaba-inc.com/ssoLogin.htm',
      authorization: cookie.get('authorization') || ''
    }
  };

  // post方式添加“application/x-www-form-urlencoded”类型
  // 如果上传文件，则手工设置 headers["content-type"] = "multipart/form-data"
  // http://blog.csdn.net/mhmyqn/article/details/25561535
  if (opts.method && opts.method.toUpperCase() === 'POST') {
    opts.headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...opts.headers
    };
  } else if (!opts.method || (opts.method && opts.method.toUpperCase() === 'GET' && absoluteUrl.indexOf('?') > -1)) {
    absoluteUrl += '&_input_charset=UTF-8';
  }

  function loginPromise() {
    return new Promise(toLogin).then(() => {
      return xFetch(absoluteUrl, options);
    });
  }

  function check401(res) {
    // location.href = '/401';
    if (res.status === 401) {
      return loginPromise();
    }
    return res;
  }

  // console.log(absoluteUrl);
  return fetch(absoluteUrl, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse)
    .catch((e) => {
      // fetch失败，多数为登录超时302跳转跨站异常，故此错误当登录超时处理
      // chrome错误：Network request failed
      // Safari错误：Network request failed
      // firefox错误：NetworkError when attempting to fetch resource.
      if (e.name === 'TypeError' && (e.message === 'Failed to fetch' || e.message === 'Network request failed' || e.message === 'NetworkError when attempting to fetch resource.')) {
        return loginPromise();
      }
      return Promise.reject(`${e}`);
    });
}

export const get = (url, params) => {
  return xFetch(`${url}?${qs.stringify(params)}`);
};

export const post = (url, params) => {
  return xFetch(url, {
    method: 'POST',
    body: qs.stringify(params)
  });
};

export default xFetch;

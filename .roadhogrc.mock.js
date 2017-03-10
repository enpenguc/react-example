var path = require('path');
var fs = require('fs');
var url = require('url')

// 读取本地文件
function fetchFileRespone(res, fileName) {
  // console.log(fileName);
  const filePath = path.join(__dirname, '/src/mock', fileName);
  fs.exists(filePath, function(exists) {
    if (exists) {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.set('Content-Type', 'application/json');
      res.end(data);
    } else {
      res.status('404');
      res.end();
    }
  });
}
// 响应请求
function respone(req, res) {
  const urlObj = url.parse(req.url, true);
  const fileName = urlObj.pathname;
  if (/\.json$/.test(fileName)) {
    const filePath = fileName.replace(/^\/api\//, '');
    fetchFileRespone(res, filePath);
  }
}

export default {
  // 本地数据mock
  'GET /api/*': function(req, res) {
    respone(req, res);
  },
  // 本地数据mock
  'POST /api/*': function(req, res) {
     respone(req, res);
  },
  // 支持值为 Object 和 Array
  'GET /test/users': { users: [1,2] },
  // GET POST 可省略
  '/test/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /test/users/create': (req, res) => { res.end('OK'); },
};

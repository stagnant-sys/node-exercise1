const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  let filename = '';
  if (q.path === '/') {
    filename = './index.html';
  } else {
    filename = '.' + q.path + '.html';
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      fs.readFile('./404.html', function(err, data) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
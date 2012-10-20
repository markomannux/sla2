var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var http = require('http');
var static = require('node-static');
var url = require('url');
var util = require('util');

var file = new(static.Server)('public', {
  cache: 3600,
  headers: { 'X-Powered-By': 'node-static'}
});


function route(handle, pathname, req, res) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res);
  } else {
    handle['static-file'](req, res);
  }
};

function serveFile(req, res) {
  req.addListener('end', function() {
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        if (err.status === 404 || err.status === 500) {
          file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
        } else {
          res.writeHead(err.status, err.headers);
          res.end();
        }
      }
    });
  });
};

var handle = {}
handle["static-file"] = serveFile;

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  route(handle, pathname, req, res);
}).listen(port, host);

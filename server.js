var str = require('virtual-dom-stringify');
var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var st = ecstatic(__dirname);
var hyperstream = require('hyperstream');
var path = require('path');
var router = require('./router.js');
var alloc = require('tcp-bind');
var fd = alloc(80);

process.setgid(process.argv[3]);
process.setuid(process.argv[2]);

var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) {
    fs.readdir(__dirname + '/public/images/large',
    function (err, files) {
      m.state = {files : files}
      var tree = m.fn(m);
      var html = req.url.split('/')[1] === 'gallery'
          ? '/public/lightbox.html' : '/public/index.html'
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    });
  }
  else st(req, res);
});
server.listen({ fd: fd });

var str = require('virtual-dom-stringify');
var http = require('http');
var ecstatic = require('ecstatic');
var st = ecstatic(__dirname + '/public');
var hyperstream = require('hyperstream');
var path = require('path');
var router = require('./router.js');
var alloc = require('tcp-bind');
var fd = alloc(82);

process.setgid(process.argv[3]);
process.setuid(process.argv[2]);

var server = http.createServer(function (req, res) {
  
  var m = router.match(req.url)
  if (m) {m.fn(m, req, res)}
  else st(req, res);
});
server.listen({ fd: fd });

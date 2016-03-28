var str = require('virtual-dom-stringify');
var http = require('http');
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
  if (m) {m.fn(m, req, res)}
  //if (m) {m.fn(m, req, res)}
  //move the rest into individual routes
  /*
  if (m) {
    fs.readdir(__dirname + '/public/images/large',
    function (err, files) {
      m.state = {files : files}
      var tree = m.fn(m);
      var html;
      if (req.url.split('/')[1] === 'gall')
        {html = '/public/index.html'} 
      else if (req.url.split('/')[1] === 'gallery')
        {html = '/public/lightbox.html'} 
      else if (req.url.split('/')[1] === 'digital')
        {html = '/public/lightbox.html'}
      else {html = '/public/index.html'}
      //copy all below into each route. html should be
      //hardcoded with the html file for that route. tree
      //will turn into the return statement that sets up the
      //dom tree for that route
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    });
  }
  */
  else st(req, res);
});
server.listen({ fd: fd });

var fs = require('fs');
var ecstatic = require('ecstatic');
var hyperstream = require('hyperstream');
var eventstream = require('event-stream');
var path = require('path');
var h = require('virtual-dom/h');
var str = require('virtual-dom-stringify');
var parser = require('virtual-html');
var router = require('routes')();
router.addRoute('/', function (m, req, res){
  var st = ecstatic(__dirname + '/public');
  st(req, res)
})
router.addRoute('/mos', function (m, req, res){
  fs.readdir(__dirname + '/public/mosaics/large',
    function (err, files) {
      var html = '/public/mosaic.html'
      var tree = h('div#stage', [
        h('div.gallery', 
          files.map(function (x) {
            return h('div', [ 
              h('a', { 'href': '/mosaics/' + x }, [
                h('img', {
                  src: '/mosaics/thumbs/t_' + x
                })
              ]) 
            ])
          })
        )
      ])
    fs.createReadStream(path.join(__dirname, html))
      .pipe(hyperstream({ '#content': str(tree) }))
      .pipe(res)
    }
  )
})
router.addRoute('/mosaics/:title', function (m, req, res){
  fs.readdir(__dirname + '/public/mosaics/large',
    function (err, files) {
      var html = '/public/lightboxm.html'
      var tree = h('div#stage', 
        files.map(function (x) {
          return h('div.players', [ 
            h('img', {
              src: '/mosaics/large/' + x
            })
          ])
        })
      )
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    })
})
router.addRoute('/dig', function (m, req, res){
  fs.readdir(__dirname + '/public/digital/large',
    function (err, files) {
      files.sort(function (a,b) { return parseInt(a)<parseInt(b)?-1:1 })
      var html = '/public/digital.html'
      var tree = h('div#stage', [
        h('div.gallery', 
          files.map(function (x) {
            return h('div', [ 
              h('a', { 'href': '/digital/' + x }, [
                h('img', {
                  src: '/digital/thumbs/t_' + x
                })
              ]) 
            ])
          })
        )
      ])
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    })
})
router.addRoute('/digital/:title', function (m, req, res){
  fs.readdir(__dirname + '/public/digital/large',
    function (err, files) {
      files.sort(function (a,b) { return parseInt(a)<parseInt(b)?-1:1 })
      var html = '/public/lightboxd.html'
      var tree = h('div#stage', 
        files.map(function (x) {
          return h('div.players', [ 
            h('img', {
              src: '/digital/large/' + x
            })
          ])
        })
      )
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    })
  })
router.addRoute('/blog', function (m, req, res){
  var es = eventstream.merge([
    fs.createReadStream(__dirname + '/public/blog/a.html'),
    fs.createReadStream(__dirname + '/public/blog/b.html')
])
  var hs = hyperstream({
    '#content': es,
  })
  var rs = fs.createReadStream(__dirname + '/public/blog.html')
  rs.pipe(hs).pipe(res)
})
module.exports = router

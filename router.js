var fs = require('fs');
var ecstatic = require('ecstatic');
var hyperstream = require('hyperstream');
var path = require('path');
var h = require('virtual-dom/h');
var str = require('virtual-dom-stringify');
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
                  src: '/public/mosaics/thumbs/t_' + x
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
              src: '/public/mosaics/large/' + x
            })
          ])
        })
      )
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    })
})
/*
router.addRoute('/gallery/:title', function (m){
  return h('div#stage', m.state.files.map(function (x) {
    return h('div.players', [ 
      h('img', {
        src: '/public/images/large/' + x
      })
    ])
  }))
})
*/
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
                  src: '/public/digital/thumbs/t_' + x
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
              src: '/public/digital/large/' + x
            })
          ])
        })
      )
      fs.createReadStream(path.join(__dirname, html))
        .pipe(hyperstream({ '#content': str(tree) }))
        .pipe(res)
    })
})
module.exports = router

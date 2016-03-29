var fs = require('fs');
var hyperstream = require('hyperstream');
var path = require('path');
var h = require('virtual-dom/h');
var str = require('virtual-dom-stringify');
var router = require('routes')();
router.addRoute('/gall', function (m, req, res){
  fs.readdir(__dirname + '/public/images/large',
    function (err, files) {
      var html = '/public/index.html'
      var tree = h('div#stage', [
        h('div.gallery', 
          files.map(function (x) {
            return h('div', [ 
              h('a', { 'href': '/gallery/' + x }, [
                h('img', {
                  src: '/public/images/thumbs/t_' + x
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
router.addRoute('/gallery/:title', function (m, req, res){
  fs.readdir(__dirname + '/public/images/large',
    function (err, files) {
      var html = '/public/lightbox.html'
      var tree = h('div#stage', 
        files.map(function (x) {
          return h('div.players', [ 
            h('img', {
              src: '/public/images/large/' + x
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
router.addRoute('/dig', function (m){
  return h('div#stage', [
    h('div.gallery', 
      m.state.files.map(function (x) {
        return h('div', [ 
          h('a', { 'href': '/gallery/' + x }, [
            h('img', {
              src: '/public/digital/thumbs/t_' + x
            })
          ]) 
        ])
      })
    )
  ])
})
router.addRoute('/digital/:title', function (m){
  return h('div#stage', m.state.files.map(function (x) {
    return h('div.players', [ 
      h('img', {
        src: '/public/digital/large/' + x
      })
    ])
  }))
})
module.exports = router

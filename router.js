var h = require('virtual-dom/h');
var router = require('routes')();
router.addRoute('/gall', function (m){
  return h('div#stage', [
    h('div.gallery', 
      m.state.files.map(function (x) {
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
})
router.addRoute('/gallery/:title', function (m){
  return h('div#stage', m.state.files.map(function (x) {
    return h('div.players', [ 
      h('img', {
        src: '/public/images/large/' + x
      })
    ])
  }))
})
module.exports = router

var h = require('virtual-dom/h');
var router = require('routes')()
router.addRoute('/', function (m){
    return h('div#content', [
        h('div.gallery', m.state.files.map(function (x) {
            return h('div', [ 
                h('a', { 'href': '/images/' + x }, [
                    h('img', {
                        src: 'images/thumbs/t_' + x
                    })
                ]) 
            ])
        }))
    ])
})
router.addRoute('/gallery/:title', function (m){
    return h('div#content',[
        h('div.img', [
            h('img', {
                src: '/images/' + m.params.title,
                width: 500
            })
        ])
    ]);
})
module.exports = router

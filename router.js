var h = require('virtual-dom/h');
var router = require('routes')()
router.addRoute('/', function (m){
    return h('div#content', [
        h('div.gallery', m.state.files.map(function (x) {
            return h('div.img', [
                h('img', {
                    src: 'images/' + x,
                    width: 500
                })
            ]);
        }))
    ]);
})
module.exports = router

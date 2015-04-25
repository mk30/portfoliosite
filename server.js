var h = require('virtual-dom/h');
var str = require('virtual-dom-stringify');
var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var st = ecstatic(__dirname);
var hyperstream = require('hyperstream');
var path = require('path');
 
var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        fs.readdir(__dirname + '/images', onfiles);
    }
    else st(req, res);
    
    function onfiles (err, files) {
        var tree = h('div#content', [
            h('div.gallery', files.map(function (x) {
                return h('div.img', [
                    h('img', {
                        src: 'images/' + x,
                        width: 600
                    })
                ]);
            }))
        ]);
        fs.createReadStream(path.join(__dirname, 'index.html'))
            .pipe(hyperstream({ '#content': str(tree) }))
            .pipe(res)
        ;
    }
});
server.listen(6004);

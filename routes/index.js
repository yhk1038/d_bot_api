var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    /* Express default usage */
    res.render('index', { title: 'Express' });
});

/* My router start */
router.get('/keyboard', function (req, res) {

    // var menu1 = '';
    fs.readFile( __dirname + "/../data/" + "sample.json", 'utf8', function (err, data) {
        var menu = data;
        console.log( menu );

        res.set({
            'content-type': 'application/json'
        }).send(menu);
    });

});

router.post('/message', function (req, res) {

    var obj = {
        type: req.body.type,
        content: req.body.content
    };

    var ans = {
        message: {
            text: '안녕 난 사람이 아니야\n아무거나 눌러봐'
        },
        keyboard: {
            type: "buttons",
            buttons: [
                "메뉴1",
                "메뉴2",
                "메뉴3"
            ]
        }
    };

    console.log( 'obj: ', obj );
    console.log( 'req: ', req );
    console.log( 'response: ', ans);

    res.set({
        'content-type': 'application/json'
    }).send(ans);


});

module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    /* Express default usage */
    res.render('index', { title: 'Express' });
});


var first_msg = {
    message: {
        text: '안녕 난 사람이 아니야\n아무거나 눌러봐'
    },
    keyboard: {
        type: "buttons",
        buttons: [
            "나는 용현이야",
            "나는 이네야",
            "나는 쩌리야"
        ]
    }
};

/* My router start */
router.get('/keyboard', function (req, res) {

    var menu1 = '';
    fs.readFile( __dirname + "/../data/" + "sample.json", 'utf8', function (err, data) {
        var menu = data;
        console.log( menu );

        res.set({
            'content-type': 'application/json'
        }).send(menu);
    })

});


router.post('/message', function (req, res) {

    var obj = {
        type: req.body.type,
        content: req.body.content
    };

    var ans = first_msg;

    console.log( 'obj: ', req.body );
    // console.log( 'req: ', req );
    console.log( 'response: ', ans);

    res.set({
        'content-type': 'application/json'
    }).send(message(obj.content));

});

module.exports = router;


function message(req) {
    var res = first_msg;

    if (req === '나는 용현이야'){
        res.message.text = '아 그 친구 정말 잘생겼다던데';
        res.keyboard.type = 'buttons';
        res.keyboard.buttons = ['훗 역시'];
    }
    else if (req === '나는 이네야'){
        res.message.text += '용현이가 사랑한다고 전해달래\n...\n답장은 안해. 솔로한테 이런거 시키지마 (버럭)';
        res.keyboard = {type: 'text'};

    }
    else if (req === '나는 쩌리야'){
        res.message.text = '쩌리도 종류가 있다고 하던데';
        res.keyboard.type = 'buttons';
        res.keyboard.buttons = [
            '나는 쩌리 2 야', '나는 쩌리 3-2 야', '나는 쩌리 3-3 이야', '나는 쩌리 4-1 이야', '나는 쩌리 4-2 야', '나는 쩌리 5 야', '나는 쩌리 6 이야'
        ]

    } else {
        if (req.includes("사랑해")){
            res.message.text = 'ㅇㅇ'
        }
        else if (req.includes('쩌리')){
            res.message.text = '오! 안녕하세요 저희 부족한 인혜좀 잘 부탁드립니다..(하하)'

        } else {
            res.text = '...뭐래'
        }
    }

    if (req === '안녕'){
        res = first_msg;
    }

    return res
}

function keyboard(req) {

}
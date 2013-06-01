var express = require( "express" )
var app = express();
var crypto = require( "crypto" );
var server = require( "http" ).createServer( app );
var io = require( "socket.io" ).listen( server );
var redis = require( "redis" );

var client = redis.createClient( "6380" , "172.17.0.46" );

var req2hb123 = require( "./helper.js" ).req2hb123;

server.listen( 8800 );
app.use( express.bodyParser() );

//ajax events
//{{{
app.post( "/api/do_login" , function( req , res ) {
    var username = req.param( "username" , null );
    var password = req.param( "password" , null );

    var ok = function( dataObj ) {
        res.json( ["ok" , dataObj.user_info] );
    };
    var error = function() {
        res.json( ["fail"] );
    }
    req2hb123( 
        "post" ,
         "about=user&action=login&username=" 
            + username + "&password="
            + crypto.createHash( "md5" ).update( password ).digest( "hex" ) ,

        ok ,
        error
    );
});//}}}

//获取多用户信息
//{{{
app.get( "/api/users/" , function( req , res ) {
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    var qObj = JSON.parse( q );
    var what = (typeof qObj.what !== "undefined" ? qObj.what : "search");
    var object_user_id = (typeof qObj.object_user_id !== "undefined" ?  qObj.object_user_id  : null);
    var _case = (typeof qObj._case !== "undefined" ?  qObj._case  : null);

    var what2url = {
        //@todo 去除 what 
        search: "about=user&action=search&p=" + page + '&q=' + q ,
        visitors: "about=user&action=visitors_list&p=" + page + "&user_id=" + object_user_id ,
        had_bought_contact_info: "about=user&action=had_bought_contact_info_list&p=" + page + "&user_id=" + object_user_id ,
        contacts: "about=user&action=contacts_" + _case + "&p=" + page + "&user_id=" + object_user_id 
    }
    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.user_list ) );
    };
    req2hb123( "get" , what2url[what] , ok );
});
//}}}

//修改用户信息
app.post( "/api/user/" , function( req , res ) {
    var area = req.param( "area" , "" );
    var birthday = req.param( "birthday" , "" );
    var zwms = req.param( "zwms" , "" );
    var looks = req.param( "looks" , "" );
});

//获取单条用户信息
app.get( "/api/user/" , function( req , res ) {
    var userId = req.param( "user_id" , null );

    var ok = function( dataObj ) {
        //发送来的 json 是一个数组 现在需要合并之 (到 userInfo 中)
        var userInfo = JSON.parse(dataObj.user_info);
        userInfo.wantedGiftList = JSON.parse(dataObj.wanted_gift_list);
        userInfo.receivedGiftList = JSON.parse(dataObj.received_gift_list);
        res.json( userInfo );
    };
    req2hb123( "get" , "about=user&action=get_info&user_id=" + userId , ok );
});

//举报某用户
app.post( "/api/report_user/" , function( req , res ) {
    var objectUserId = req.param( "object_user_id" , 0 );
    var subjectUserId = req.param( "subject_user_id" , 0 );
    var reasonNo = req.param( "reason_no" , "" );
    var reasonDetail = req.param( "reason_detail" , "" );

    var ok = function( dataObj ) {
        res.json( '["ok"]' );
    };
    var error = function() {
        
    } 
    req2hb123(
        "post" , 
        "about=user&action=report&object_user_id=" + objectUserId + 
            "&subject_user_id=" + subjectUserId  + 
            "&reason_no=" + reasonNo + 
            "&reason_detail=" + reasonDetail ,
            
        ok
    );
});

//@todo should be put, but I hava not enought time .... so sad I am.
app.post( "/api/tweet_it/" , function( req , res ) {
    var userId = req.param( "user_id" );
    var tweetContent = req.param( "content" );

    var ok = function( dataObj ) {
        res.json( ["ok"] );
    }
    req2hb123( 
        "post" , 
        "about=user&action=update_to_say&content=" + tweetContent + 
        "&user_id=" + userId ,

        ok
    );
});

app.get( "/api/should_display_contact_info/" , function( req , res ) {
    var type = req.param( "type" );
    var objUserId = req.param( "object_user_id" );
    var subUserId = req.param( "subject_user_id" );

    var ok = function( dataObj ) {
        console.dir( dataObj )
        res.json( dataObj );
    };
    req2hb123( 
        "get" , 
        "about=user&action=should_display_contact_info&type=" + type + 
        "&object_user_id=" + objUserId + 
        "&subject_user_id=" + subUserId ,

        ok
    );
});

//获取礼物列表
//{{{
app.get( "/api/gifts/" , function( req , res ) {
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    //解析 q
    var qObj = JSON.parse( q );
    var what = (typeof qObj.what !== "undefined" ? qObj.what : "all");
    var object_user_id = (typeof qObj.object_user_id !== "undefined" ?  qObj.object_user_id  : null);

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.gift_list ) );
    };
    //根据不同的 what 访问不同的 api
    var what2url = {
        all: "about=gift&action=get_all&p=" + page ,
        sended: "about=gift&action=sended_list&p=" + page + "&user_id=" + object_user_id ,
        received: "about=gift&action=received_list&p=" + page + "&user_id=" + object_user_id 
    };
    req2hb123( "get" , what2url[what] , ok );
});
//}}}

//送礼物给指定的用户
app.post( "/api/send_gift/" , function( req , res ) {
    var giftId = req.param( "gift_id" );
    var targetUserId = req.param( "target_user_id" );
    var fromUserId = req.param( "from_user_id" );

    var ok = function( dataObj ) {
        res.json( [ "ok" ] );
    };
    req2hb123( 
        "get" , 
        "about=gift&action=send&gift_id=" + giftId + 
        "&target_user_id=" + targetUserId + 
        "&from_user_id=" + fromUserId , 

        ok 
    );
});

//交易记录
app.get( "/api/payment_recoreds/" , function( req , res ) {
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    var qObj = JSON.parse( q );
    var object_user_id = (typeof qObj.object_user_id !== "undefined" ?  qObj.object_user_id  : null);

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.record_list ) );
    }
    req2hb123( 
        "get" , 
        "about=user&action=payment_record&p=" + page + "&user_id=" + object_user_id ,

        ok 
    );
});

//socket events
io.sockets.on('connection', function( socket ) {

});

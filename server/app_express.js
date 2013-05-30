var express = require( "express" )
var app = express();
var crypto = require( "crypto" );
var server = require( "http" ).createServer( app );
var io = require( "socket.io" ).listen( server );

var req_to_hb123 = require( "./helper.js" ).req_to_hb123;

server.listen( 8800 );

app.use( express.bodyParser() );
//ajax event
//login
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
    req_to_hb123( 
        "post" , 
         "about=user&action=login&username=" 
            + username + "&password="
            + crypto.createHash( "md5" ).update( password ).digest( "hex" ) ,
        ok 
    );
});//}}}

//获取多用户信息
//{{{
app.get( "/api/users/" , function( req , res ) {
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , {} );
    var ok = function( dataObj ) {
        console.dir( dataObj )
        res.json( JSON.parse( dataObj.users_info ) );
    };
    req_to_hb123( "get" , "about=user&action=search&p=" + page + '&q=' + q , ok );
});
//}}}

//获取单条的用户信息 相比批量获取的用户信息来说 
//添加了一些只有在 详细页面上才用的到的信息
//@todo 但是这样以来岂不是会多次获取相同的信息(比如用户信息的共用部分)
app.get( "/api/user/" , function( req , res ) {
    var userId = req.param( "user_id" , 0 );

    var ok = function( dataObj ) {
        res.json( JSON.parse(dataObj.user_info) );
    };
    req_to_hb123( "get" , "about=user&action=get_info&user_id=" + userId , ok );
});

app.get( "/api/should_display_contact_info/" , function( req , res ) {
    var type = req.param( "type" );
    var objUserId = req.param( "object_user_id" );
    var subUserId = req.param( "subject_user_id" );

    var ok = function( dataObj ) {
        console.dir( dataObj )
        res.json( dataObj );
    };
    req_to_hb123( 
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

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.gifts_info ) );
    };
    req_to_hb123( "get" , "about=gift&action=get_all&p=" + page , ok );
});
//}}}

//送礼物给指定的用户
app.post( "/api/send_gift/" , function( req , res ) {
    var giftId = req.param( "gift_id" );
    var targetUserId = req.param( "target_user_id" );
    var fromUserId = req.param( "from_user_id" );

    var ok = function( dataObj ) {
        res.json( "ok" );
    };
    req_to_hb123( 
        "get" , 
        "about=gift&action=send&gift_id=" + giftId + 
        "&target_user_id=" + targetUserId + 
        "&from_user_id=" + fromUserId , 

        ok 
    );
});
//购买指定的礼物

//socket events
io.sockets.on('connection', function( socket ) {
});

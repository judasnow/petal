var express = require( "express" )
var app = express();
var server = require( "http" ).createServer( app );
var io = require( "socket.io" ).listen( server );
var request = require( "superagent" );
var crypto = require( "crypto" );
var redis = require( "redis" );

var redisClient = client = redis.createClient( "6380" , "172.17.0.46" );
var HB123_SERVER = "http://172.17.0.20:1979/Mobile/Api.aspx?";
server.listen( 8800 );

var req_to_hb123 = function( method , param , ok , error ) {
     request[method](
         HB123_SERVER + param,
         function( data ) {
            console.dir( data.text );
            var dataObj = JSON.parse( data.text );
            if( dataObj.code === "200" ) {
                ok( dataObj );
            } else {
                if( typeof error === "undefined" ) {
                    console.log( "request error" );
                }
            }
         }
     );
}

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
    console.dir( q );
    var ok = function( dataObj ) {
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

//socket event
io.sockets.on('connection', function( socket ) {

});

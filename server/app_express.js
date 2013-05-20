var express = require( "express" )
var app = express();
var server = require( "http" ).createServer( app );
var io = require( "socket.io" ).listen( server );
var request = require( "superagent" );
var crypto = require('crypto');

var HB123_SERVER = "http://172.17.0.20:1979/Mobile/Api.aspx?";
server.listen( 8800 );

app.use( express.bodyParser() );
//ajax event

//login
//{{{
app.post( "/api/do_login" , function( req , res ) {
    var username = req.param( "username" , null );
    var password = req.param( "password" , null );
    console.log( password )
    request.get(
        HB123_SERVER + "about=user&action=login&username=" 
            + username + "&password="
            + crypto.createHash( "md5" ).update( password ).digest( "hex" ) ,
        function( data ) {
            var data = JSON.parse( data.text );
            if( data.code === "200" ) {
                //有两种情况会返回 200
                //1 成功登录系统
                //2 用户之前已经登录
                res.json( ["ok" , data.user_info] );
            } else {
                //其余均为登录错误的情况
                res.json( ["fail"] );
            }
        });
});//}}}

app.get( "/api/users/" , function( req , res ) {
    var page = req.param( "p" , 1 );
     request.get(
         HB123_SERVER + 'about=user&action=search&p=' + page + '&q={"location":"北京"}' ,
         function( data ) {
            var dataObj = JSON.parse( data.text );
            if( dataObj.code === "200" ) {
                console.log( typeof JSON.parse(dataObj.users_info) )
                res.json( JSON.parse(dataObj.users_info) );
            }
         });
});

//socket event
io.sockets.on('connection', function (socket) {

});

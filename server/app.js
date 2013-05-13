var io = require( "socket.io" ).listen( 8800 );
var request = require( "superagent" );
var crypto = require('crypto');

var huaban123Server = "http://172.17.0.20:1979/Mobile/Api.aspx?";

io.sockets.on( 'connection', function( socket ) {

    //用户登录 
    //{{{
    socket.on( "do_login" , function( data ) {
        var username = data.username;
        var password = data.password;

        request.get(
            huaban123Server + "about=user&action=login&username=" + username + "&password=" + crypto.createHash( "md5" ).update( password ).digest( "hex" ) ,
            function( res ) {
                var res = JSON.parse( res.text );
                if( res.code === "200" ) {
                    //有两种情况会返回 200
                    //1 成功登录系统
                    //2 用户之前已经登录
                    socket.emit( "login_ok" , { object_user_info: res.user_info } );
                } else {
                    //其余均为登录错误的情况
                    socket.emit( "login_fail" , {} );
                }
            }
        );
    });//}}}

    //获取用户列表
    //{{{
    socket.on( "users:read" , function( data , callback ){
        request.get(
            huaban123Server + 'about=user&action=search&p=1&q={"location":"北京"}' ,
            function( res ) {
                var res = JSON.parse( res.text );
                //The model should be a JSON representation of the client-side model's attributes.
                //难道是我理解有误?
                if( res.code === "200" ) {
                    callback( null , JSON.parse( res.users_info ) );
                }
            }
        )
    });//}}}
});


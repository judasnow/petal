// 应用程序入口
define([
    "backbone" ,
    "router" ,

    "m/user"
],
function( 
    Backbone ,
    Router ,

    User
    ) {
        "use strict";

        var init = function() {
            //objectUserInfo -> objectUserModel
            try {
                window.objectUser = new User( JSON.parse( window.localStorage.getItem( "petal:object_user_info" ) ) );

                //初始化 socketio
                window.socketServer = "http://172.17.0.47:8800";
                window.socket = io.connect( window.socketServer );

                socket.on( "error" , function() {
                    console.log( "socket connect fail" );
                });

                socket.on( "disconnect" , function() {
                    console.log( "socket disconnected" );
                });

                window.socket.on( "msg:" + window.objectUser.get( "UserId" ) , function( data ) {
                    var newMsgCount = (function( lastCount ) {
                        if( isNaN( lastCount ) ) {
                            return 1;
                        } else {
                            return parseInt( lastCount ) + 1;
                        }
                    })( $( "#menu .msgs .jq-badge" ).text() );

                    $.ui.updateBadge( "#menu .msgs" , newMsgCount );
                    $( "#chat_list" ).trigger( "receive_new_msg" , data );
                    //返回一个hash key MsgId:AcceptUserId
                    window.socket.emit( "check_msg_ok" , {key: data.MsgId + ":" + data.AcceptUserId} );
                });

            } catch ( e ) {
                console.dir( "app init error" );
                console.dir( e );
            }

            var router = new Router();
            window.router = router;
            Backbone.history.start({
                pushState: true, 
                hashChange: true
            });
        };

        return {
            initialize: init
        }
});

define([
    "socketio"
],
function(
    io 
) {
    "use strict";

    //为了保证只建立一个链接
    if( typeof window.socket === "undefined" ) {
        window.socket = io.connect( "http://icket.us:8800" );

        socket.on( "connect" , function() {
            $( "#globle_notice_sys" ).popup( "close" );
        });

        socket.on( "disconnect" , function() {
            //@todo 需要禁用一些操作
            $( "#globle_notice_sys" ).text( "当前网络不可用" )
                .popup( "open" );
        });
    }

    return window.socket;
});

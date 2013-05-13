define(
    [ "socketio" ],
    function( io ) {
        "use strict";

        if( typeof window.socket === "undefined" ) {
            window.socket = io.connect( "http://icket.us:8800" );
        }

        return window.socket;
    }
);

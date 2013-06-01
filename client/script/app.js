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

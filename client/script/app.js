// 应用程序入口
define([
    "backbone" ,
    "router" ,
],
function( 
    Backbone ,
    Router
    ) {
        "use strict";

        var init = function() {

            var router = new Router();
            window.router = router;
            Backbone.history.start({pushState: true,hashChange: true});
        };

        return {
            initialize: init
        }
});

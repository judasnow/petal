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
        Backbone.history.start();
        };

        return {
            initialize: init
        }
});

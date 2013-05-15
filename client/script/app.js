define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "router" ,
    "jqm.config"
],
function( 
    $ ,
    _ ,
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

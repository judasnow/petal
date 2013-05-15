define([ 
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit"
],
function( 
    $ ,
    _ ,
    Backbone ,
    Mustache
    , socket
){
    "use strict";

    var MainPanel = Backbone.View.extend({
        baseEvents: {
            "tap .stream_same_city": "streamSameCityHandler",
            "tap .search": "searchHandler"
        },

        baseInitialize: function() {
            _.bindAll( this , "streamSameCityHandler" , "searchHandler" );
        },

        streamSameCityHandler: function() {
            window.route.navigate( "#stream" , {trigger: true} );
        },

        searchHandler: function() {
            window.route.navigate( "#search" , {trigger: true} );
        },

        render: function() {
            return this;
        }
    });
    return MainPanel;
}
);


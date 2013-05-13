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
            "click .stream_same_city": "streamSameCityHandler",
            "click .search": "searchHandler"
        },

        baseInitialize: function( route ) {
            this.route = route;
            _.bindAll( this , "streamSameCityHandler" , "searchHandler" );
        },

        before: function(){
            $( "trigger_main_panel" ).click();
        },

        streamSameCityHandler: function() {
            this.route.navigate( "#stream" , {trigger: true} );
        },

        searchHandler: function() {
            this.route.navigate( "#search" , {trigger: true} );
        },

        render: function() {
            return this;
        }
    });
    return MainPanel;
}
);


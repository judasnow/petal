define([ 
    "underscore" ,
    "backbone" ,

    "text!tpl/404.html"
],
function( 
    _ ,
    Backbone ,

    error404Tpl 
){
    "use strict";

    var Error404 = Backbone.extend({

        initialize: function( args ) {
            this.baseInitialize( "stream" , vistitorTpl , ScreamItemView , users , args.q , args.hash );
        } 
    });

    return Visitors;
});



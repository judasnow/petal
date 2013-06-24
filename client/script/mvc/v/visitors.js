define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "c/users" ,
    "v/stream_item" ,
    "v/stream_base" ,
    "v/menu" ,

    "text!tpl/vistitor.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Users ,

    ScreamItemView ,
    StreamBase ,
    MenuView ,

    vistitorTpl 
){
    "use strict";

    var Visitors = StreamBase.extend({
 
        initialize: function( args ) {
            new MenuView();
            var users = new Users();
            this.baseInitialize( "stream" , vistitorTpl , ScreamItemView , users , args.q , args.hash );
        } 
    });

    return Visitors;
});



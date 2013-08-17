define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/msgs" ,

    "v/msg" ,
    "v/stream_base" ,

    "v/menu" ,

    "text!tpl/msgs.html" 
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    msgs ,

    msgItemView ,
    StreamBase ,

    MenuView ,

    msgsTpl
) {
    "use strict";

    var MsgsView = StreamBase.extend({

        initialize: function( args ) {
            new MenuView();
            var msgs = new Msgs();
            this.baseInitialize( "msgs" , msgsTpl , msgItemView , msgs , args.q , args.hash );
        } 
    });

    return MsgsView;
});



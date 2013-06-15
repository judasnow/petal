define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/users" ,

    "v/contaces_stream_item" ,
    "v/stream_base" ,
    "v/menu" ,

    "text!tpl/contaces.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Users ,

    ContactsStreamItemView ,
    StreamBase ,
    MenuView ,

    contacesTpl 
){
    "use strict";

    var Contacts = StreamBase.extend({

        initialize: function( args ) {
            new MenuView();

            var users = new Users();
            this.baseInitialize( "stream" , contacesTpl , ContactsStreamItemView , users , args.q , args.hash );
        } 
    });

    return Contacts;
});



define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "c/users" ,
    "v/had_bought_contact_info_stream_item" ,
    "v/stream_base" ,
    "v/menu" ,

    "text!tpl/had_bought_contact_info.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Users ,
    HadBoughtContactInfoStreamItemView ,
    StreamBase ,
    MenuView ,

    hadBoughtContactInfoTpl 
){
    "use strict";

    var HadBoughtContactInfo = StreamBase.extend({

        initialize: function( args ) {
            var users = new Users();
            this.baseInitialize( "stream" , hadBoughtContactInfoTpl , HadBoughtContactInfoStreamItemView , users , args.q , args.hash );
        } 
    });

    return HadBoughtContactInfo;
});



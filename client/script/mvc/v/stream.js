define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "c/stream" ,
    "v/stream_item" ,
    "v/stream_base" ,

    "text!tpl/stream.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Gifts ,
    GiftItemView ,
    StreamBase ,

    streamTpl 
){
    "use strict";

    var Stream = StreamBase.extend({
        initialize: function() {
            var gifts = new Gifts();
            this.baseInitialize( "gift_list" , giftListTpl , GiftItemView , gifts );
        },

        render: function() {
            return this;
        }
    });

    return GiftList;
});



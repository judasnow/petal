define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "c/gifts" ,
    "v/gift_item" ,
    "v/stream_base" ,

    "text!tpl/gift_list.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Gifts ,
    GiftItemView ,
    StreamBase ,

    giftListTpl 
){
    "use strict";

    var GiftList = StreamBase.extend({
        initialize: function() {
            var gifts = new Gifts();
            this.baseInitialize( "gift_list" , giftListTpl , GiftItemView , gifts );
        }
    });

    return GiftList;
});


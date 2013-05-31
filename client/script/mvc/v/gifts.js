//用户礼物中心
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "v/stream_base" ,
    "v/gift_item" ,

    "c/gifts" ,

    "text!tpl/gifts.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    StreamBase ,
    GiftItemView ,

    Gifts ,

    giftsTpl
) {
    "use strict";

    var GiftsView = StreamBase.extend({

        initialize: function( args ) {
            var gifts = new Gifts();
            this.baseInitialize( 
                "gifts" , 
                giftsTpl , 
                GiftItemView , 
                gifts , 
                args.q ,
                args.hash 
            );
        }
    });

    return GiftsView;
});


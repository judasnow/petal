//用户礼物中心
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "v/stream_base" ,
    "v/gift_record" ,
    "v/menu" ,

    "c/gifts" ,

    "text!tpl/gifts.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    StreamBase ,
    GiftRecordView ,
    MenuView ,

    Gifts ,

    giftsTpl
) {
    "use strict";

    var GiftsView = StreamBase.extend({

        initialize: function( args ) {
            new MenuView();
            var gifts = new Gifts();

            this.baseInitialize( 
                "gifts" , 
                giftsTpl , 
                GiftRecordView , 
                gifts , 
                args.q ,
                args.hash 
            );
        }
    });

    return GiftsView;
});


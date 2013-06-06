define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/gifts" ,

    "v/gift_item" ,
    "v/stream_base" ,
    "v/menu" ,

    "text!tpl/gift_list.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    Gifts ,

    GiftItemView ,
    StreamBase ,
    MenuView ,

    giftListTpl 
) {
    "use strict";

    var GiftList = StreamBase.extend({
        initialize: function( args ) {
            new MenuView();
            var gifts = new Gifts();

            this.baseInitialize( "gift_list" , giftListTpl , GiftItemView , gifts , args.q , args.hash );
        }
    });

    return GiftList;
});


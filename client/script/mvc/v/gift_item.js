define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/gift_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    giftItemTpl
){
    "use strict";

    var GiftItem = Backbone.View.extend({
        className: "item",
        template: giftItemTpl ,

        events: {
            "tap": "sendGift"
        },

        initialize: function() {
            _.bindAll( this , "sendGift" );
        },

        sendGift: function() {
            var sendGiftTo = window.localStorage.getItem( "send_gift_to" );
            if( sendGiftTo === null ) {
                alert( "没有选择目标用户" )
            } else {
                var giftId = this.model.get( "GId" );
                alert( "将送给" + sendGiftTo + giftId )
            }
        },

        render: function() {
            this.$el.html( 
                Mustache.to_html( 
                    this.template , 
                    this.model.toJSON() 
                ) 
            );
            return this;
        }
    });

    return GiftItem;
});

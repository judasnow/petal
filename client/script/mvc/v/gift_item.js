define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/gift_item.html" ,

    "lib/helper" ,
    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    giftItemTpl ,

    helper ,
    commonOperate
){
    "use strict";

    var GiftItem = Backbone.View.extend({
        className: "item",
        template: giftItemTpl ,

        events: {
            "tap": "sendGift"
        },

        initialize: function() {
            _.bindAll( 
                this , 
                "sendGift"
            );
        },

        sendGift: function( event ) {
        //{{{
            event.stopImmediatePropagation();

            var targetUserId = window.localStorage.getItem( "petal:send_gift_target_user_id" );
            commonOperate.sendGift( targetUserId , this.model.get( "GId" ) , this.model.get( "GPrice" ) );
        } ,//}}}

        render: function() {
        //{{{
            this.$el.html( 
                Mustache.to_html( 
                    this.template , 
                    this.model.toJSON() 
                ) 
            );
            helper.showImage( this.$el.find( "img" ) );
            return this;
        }//}}}
    });

    return GiftItem;
});

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
            $( "#globle_notice" ).popup( "open" );
        },

        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );
            return this;
        }
    });

    return GiftItem;
});

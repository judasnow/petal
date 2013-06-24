define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/chat_item.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    chatItemTpl ,

    helper
){
    "use strict";

    var ChatItem = Backbone.View.extend({
        className: "item",
        template: chatItemTpl,

        events: {
            "tap": "sendGift"
        },

        initialize: function() {

        },

        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );

            helper.showImage( this.$el.find( "img" ) );
            return this;
        }
    });

    return ChatItem;
});

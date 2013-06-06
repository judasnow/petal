define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/chat_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    chatItemTpl
){
    "use strict";

    var ChatItem = Backbone.View.extend({
        className: "item",
        template: chatItemTpl ,

        events: {
            "tap": "sendGift"
        },

        initialize: function() {

        },

        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );
            return this;
        }
    });

    return ChatItem;
});

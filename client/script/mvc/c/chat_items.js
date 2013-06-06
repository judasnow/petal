define([
    "underscore" ,
    "backbone" ,

    "m/chat_item"

],
function( 
    _ ,
    Backbone ,

    ChatItemModel
){
    "use strict";

    var ChatItems = Backbone.Collection.extend({
        model: ChatItemModel ,

        url: "/api/chat_items" ,

        initialize: function() {
            
        }

    });

    return ChatItems;
});



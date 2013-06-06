define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var ChatItem = Backbone.Model.extend({
        url: "/api/chat_item",

        initialize: function(){
            
        }
    });

    return ChatItem;
});



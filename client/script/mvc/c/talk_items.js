define([
    "underscore" ,
    "backbone" ,

    "m/talk_item"

],
function( 
    _ ,
    Backbone ,
    TalkItemModel
){
    "use strict";

    var TalkItems = Backbone.Collection.extend({
        model: TalkItemModel ,

        url: "talk_items" ,

        initialize: function() {
            
        }

    });

    return TalkItems;
});



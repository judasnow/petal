define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "m/talk_item",
    "socketioinit",
    "backboneiosync",
    "backboneiobind"
],
function( 
    $ ,
    _ ,
    Backbone,
    TalkItemModel,
    socket
){
    "use strict";

    var TalkItems = Backbone.Collection.extend({
        model: TalkItemModel ,

        url: "talk_items" ,

        socket: socket ,

        initialize: function() {
            
        }

    });

    return TalkItems;
});



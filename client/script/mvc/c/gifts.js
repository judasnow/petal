define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "m/gift",
    "socketioinit",
    "backboneiosync",
    "backboneiobind"
],
function( 
    $ ,
    _ ,
    Backbone,
    GiftModel,
    socket
){
    "use strict";

    var Gifts = Backbone.Collection.extend({
        model: GiftModel,

        url: "gifts",

        socket: socket,

        initialize: function() {
            
        }

    });

    return Gifts;
});



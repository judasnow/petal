define([
    "underscore" ,
    "backbone" ,

    "m/gift"
],
function( 
    _ ,
    Backbone,

    GiftModel
){
    "use strict";

    var Gifts = Backbone.Collection.extend({
        model: GiftModel,

        url: "/api/gifts/",

        initialize: function() {
            
        }
    });
    return Gifts;
});



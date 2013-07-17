define([
    "underscore" ,
    "backbone" ,

    "m/msg"
],
function( 
    _ ,
    Backbone,

    MsgModel
){
    "use strict";

    var Msgs = Backbone.Collection.extend({
        model: MsgModel,

        url: "/api/msgs/",

        initialize: function() {

        }
    });

    return Msgs;
});


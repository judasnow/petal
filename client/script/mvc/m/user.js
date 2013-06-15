define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var User = Backbone.Model.extend({

        url: "/api/user/",

        initialize: function() {

        } 
    });

    return User;
});



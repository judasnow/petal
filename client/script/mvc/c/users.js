define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "m/user",
    "socketioinit",
    "backboneiosync",
    "backboneiobind"
],
function( 
    $ ,
    _ ,
    Backbone,
    UserModel,
    socket
){
    "use strict";

    var Users = Backbone.Collection.extend({
        model: UserModel,

        url: "users",

        socket: socket,

        initialize: function() {
            
        }

    });

    return Users;
});



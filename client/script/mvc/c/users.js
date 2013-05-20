define([
    "underscore" ,
    "backbone" ,
    "m/user"

],
function( 
    _ ,
    Backbone,
    UserModel
){
    "use strict";

    var Users = Backbone.Collection.extend({
        model: UserModel,

        url: "/api/users/",

        initialize: function() {
            
        }

    });

    return Users;
});



// 当前登录用户的信息
define([
    "jquery" ,
    "underscore" ,
    "backbone"
],
function( 
    $ ,
    _ ,
    Backbone
){
    "use strict";

    var objectUser = Backbone.Model.extend({
        id: "objectUser",

        url: "object_user",

        initialize: function(){
            
        }
    });

    return objectUser;
});



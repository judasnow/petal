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

    var Gift = Backbone.Model.extend({
        url: "gift",

        initialize: function(){
            
        }
    });

    return Gift;
});



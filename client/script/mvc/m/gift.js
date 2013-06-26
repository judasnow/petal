define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var Gift = Backbone.Model.extend({
        url: "gift",

        initialize: function(){
            var createAt = new Date( this.get( "SendAt" ) );
            this.set( "time" , createAt.getFullYear() + "/" + createAt.getMonth() + "/" + createAt.getDate() );
        }
    });

    return Gift;
});



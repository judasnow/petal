define([
    "underscore" ,
    "backbone" ,

    "m/diary"
],
function( 
    _ ,
    Backbone ,

    Diary
){
    "use strict";

    var Diaries = Backbone.Collection.extend({
        model: Diary ,

        url: "/api/diaries" ,

        initialize: function() {
            
        }

    });

    return Diaries;
});



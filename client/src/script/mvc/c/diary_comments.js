// 
define([
    "underscore" ,
    "backbone" ,

    "m/diary_comment"
],
function( 
    _ ,
    Backbone ,

    DiaryComment
){
    "use strict";

    var DiaryComments = Backbone.Collection.extend({
        model: DiaryComment ,

        url: "/api/diary_comments" ,

        initialize: function() {
            
        }

    });

    return DiaryComments;
});



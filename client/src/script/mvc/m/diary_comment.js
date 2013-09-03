// 
define([
    "underscore" ,
    "backbone" ,

    "lib/helper"
],
function( 
    _ ,
    Backbone ,

    helper
){
    "use strict";

    var DiaryComment = Backbone.Model.extend({
        url: "/api/diary_comment",

        initialize: function() {
            this.set( "time" , helper.resetTime( this.get( "CreateAt" ) ) );
            this.set( "sexInEnglish" , this.get( "Sex" ) === "男" ? "male" : "female" );
        }
    });

    return DiaryComment;
});



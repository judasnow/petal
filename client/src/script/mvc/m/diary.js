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

    var Diary = Backbone.Model.extend({
        url: "/api/diary",

        initialize: function() {
            var content = this.get( "Content" );

            if( typeof content !== "undefined" && content !== "" ) {
                this.set( "Content" , helper.removeHTMLTag( this.get( "Content" ) ) );

                this.set(
                    "summary" ,
                    (function( content ) {
                        return content.length > 20 ?
                            content.substring( 0 , 20 ) + "..." :
                            content;
                    })( this.get( "Content" ) )
                );
            }

            this.set( "sexInEnglish" , this.get( "Sex" ) === "男" ? "male" : "female" );

            if( this.get( "sexInEnglish" ) === "女" ) {
                this.set( "isFemale" , true );
            } else {
                this.set( "isFemale" , false );
            }

            this.set( "time" , helper.resetTime( this.get( "CreateAt" ) ) );
        }
    });

    return Diary;
});



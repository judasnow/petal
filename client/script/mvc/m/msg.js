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

    var Msg = Backbone.Model.extend({
        url: "/api/msg",

        initialize: function() {
            var createAt = new Date( this.get( "CreateAt" ) );
            this.set( 
                "time" ,
                helper.resetTime( this.get( "CreateAt" ) ) 
            );

            this.set( "sex_in_english" , this.get( "SrcSex" ) === "男" ? "male" : "female" );

            this.set(
                "summary" ,
                (function( content ) {
                    return content.length > 20 ?
                        content.substring( 0 , 20 ) + "..." :
                        content;
                })( this.get( "Content" ) )
            );
        }
    });

    return Msg;
});



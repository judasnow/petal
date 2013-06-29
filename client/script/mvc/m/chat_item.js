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

    var ChatItem = Backbone.Model.extend({
        url: "/api/chat_item",

        initialize: function(){
            this.set( 
                "role" , 
                window.objectUser.get( "UserId" ) === this.get( "SrcUserId" ) ? 
                    "subject" : 
                    "object" 
            );

            if( typeof this.get( "sex_in_english" ) === "undefined" ) {
                this.set( "sex_in_english" , this.get( "SrcSex" ) === "男" ? "male" : "female" );
            }

            this.set( 
                "time" ,
                helper.resetTime( this.get( "CreateAt" ) ) 
            );
        }
    });

    return ChatItem;
});



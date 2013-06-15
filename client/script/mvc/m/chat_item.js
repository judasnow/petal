define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var ChatItem = Backbone.Model.extend({
        url: "/api/chat_item",

        initialize: function(){
            var createAt = new Date( this.get( "CreateAt" ) ) && new Date();

            this.set( 
                "role" , 
                window.objectUser.get( "UserId" ) === this.get( "SrcUserId" ) ? 
                    "subject" : 
                    "object" 
            );

            this.set( 
                "time" , 
                createAt.getFullYear() + "-" + 
                createAt.getMonth() + "-" + 
                createAt.getDate() + " " +
                createAt.getHours() + ":" + 
                createAt.getMinutes() + ":" +
                createAt.getSeconds()
            );
        }
    });

    return ChatItem;
});



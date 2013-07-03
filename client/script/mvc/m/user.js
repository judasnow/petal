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

    var User = Backbone.Model.extend({

        url: "/api/user/",

        initialize: function() {
            //如果 type 是 visitors 格式化浏览时间
            if( this.get( "type" ) === "visitors" ) {
                this.set( "visit_time" , helper.resetTime( this.get( "BrowseAt" ) ) );
            }
        } 
    });

    return User;
});



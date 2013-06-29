define([
    "underscore" ,
    "backbone" ,

    "date_utils"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var Gift = Backbone.Model.extend({
        url: "gift",

        initialize: function() {
            //@todo 重复
            var createAt = new Date( this.get( "SendAt" ) );
            //进行一个时区的转换 需要减去 8 小时
            var createAt = new Date( this.get( "CreateAt" ) );
            //createAt.getTimezoneOffset() * 60000;
            createAt.addMilliseconds( -28800000 );
            this.set( 
                "time" , 
                createAt.getFullYear() + "/" + (createAt.getMonth() + 1) + "/" + createAt.getDate() + " "
                + createAt.getHours() + ":" 
                + createAt.getMinutes() + ":"
                + createAt.getSeconds()
            );
        }
    });

    return Gift;
});



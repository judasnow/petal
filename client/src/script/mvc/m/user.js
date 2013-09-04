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

        url: "/api/user/" ,

        initialize: function() {
            _.bindAll( this , "_formateInfo" );

            this.listenTo( this , "change" , this._formateInfo );
        } ,

        _formateInfo: function() {
            var type = this.get( "type" );

            //如果 type 是 visitors 格式化浏览时间
            if( type === "visitors" ) {
                this.set( "visit_time" , helper.resetTime( this.get( "BrowseAt" ) ) );
            }

            if( type === "detail" ) {
                //格式化日志信息
                var diariesList = this.get( "diariesList" );

                diariesList = _.map( diariesList , function( item ) {
                   item.time = helper.resetTime( item.CreateAt );
                   return item;
                });

                this.set( "diariesList" , diariesList );
            }

        }
    });

    return User;
});



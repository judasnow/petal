define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/msg.html" ,

    "lib/helper"
],
function(
    _ ,
    Backbone ,
    Mustache ,

    msgTpl ,

    helper
){
    "use strict";

    var Msg = Backbone.View.extend({
        className: "item" ,
        template: msgTpl ,
        events: {
            "click": "seeDetail"
        } ,

        initialize: function() {
            _.bindAll( this , "seeDetail" );
        },

        seeDetail: function() {
            //回复对象
            var rootMsgId = this.model.get( "MBId" );
            if( rootMsgId === 0 ) {
                rootMsgId = this.model.get( "MsgId" );
            }
            window.localStorage.setItem( "petal:send_msg_target_user_id" , this.model.get( "SrcUserId" ) );
            window.localStorage.setItem( "petal:root_msg_id" , rootMsgId );
            window.router.navigate( "/#chat_list", {trigger: true} );
        },

        render: function() {
            this.$el.html(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                ) 
            );
            helper.showImage( this.$el.find( "img" ) );
            return this;
        }
    });

    return Msg;
});



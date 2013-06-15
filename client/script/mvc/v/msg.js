define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/msg.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    msgTpl 
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
            window.localStorage.setItem( "petal:send_msg_target_user_id" , this.model.get( "SrcUserId" ) );
            window.localStorage.setItem( "petal:root_msg_id" , this.model.get( "MBId" ) );
            window.router.navigate( "/#chat_list", {trigger: true} );
        },

        render: function() {
            this.$el.html(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                ) 
            );
            return this;
        }
    });

    return Msg;
});



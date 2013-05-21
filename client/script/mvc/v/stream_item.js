//用户信息流中的一条信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/stream_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    streamTpl
){
    "use strict";

    var StreamItem = Backbone.View.extend({
        className: "item" ,

        events: {
            "click .check_contact_info": "checkContactInfo" ,
            "click .send_msg": "sendMsg" ,
            "click .send_gift": "sendGift" ,
            "click": "goDetailPage"
        },

        template: streamTpl ,

        initialize: function() {
            _.bindAll( this , "checkContactInfo" , "sendMsg" , "sendGift" , "goDetailPage" );
            this.listenTo( this.model , "change" , this.render );
        },

        checkContactInfo: function( event ) {
            event.stopImmediatePropagation();
        },

        sendMsg: function( event ) {
            event.stopImmediatePropagation();
            window.router.navigate( "#talk" , {trigger: true} );
        },

        sendGift: function( event ) {
            event.stopImmediatePropagation();

            //跳转到礼品选择页面
            window.router.navigate( "#gift_list" , {trigger: true} );
        },

        goDetailPage: function( event ) {
            //保存本用户信息 到本地 
            var userName = this.model.get( "UserName" );

            //@todo 此处如何缓存比较合理?
            window.localStorage.setItem( "user_info:" + userName , JSON.stringify( this.model.toJSON() ) );
            window.route.navigate(
                "#user_detail/" + userName,
                {
                    trigger: true
                }
            );
        },

        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );
            return this;
        }
    });

    return StreamItem;
});


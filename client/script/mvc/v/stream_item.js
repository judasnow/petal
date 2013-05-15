//用户信息流中的一条信息
define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" ,
    "text!tpl/stream_item.html"
] ,
function(
    $ ,
    _ ,
    Backbone ,
    Mustache ,
    socket ,
    streamTpl
){
    "use strict";

    var StreamItem = Backbone.View.extend({
        className: "item",

        events: {
            "tap .check_contact_info": "checkContactInfo",
            "tap .send_msg": "sendMsg",
            "tap .send_gift": "sendGift",
            "tap": "goDetailPage"
        },

        template: streamTpl ,

        initialize: function() {
            //礼物列表
            this.$giftListPanelEl = $( "#gift_list_panel" );
            //找到这个元素 content 应该有更好的办法
            //主 content
            this.$pageContentEl = $( ".stream" ).parent();
            _.bindAll( this , "checkContactInfo" , "sendMsg" , "sendGift" , "goDetailPage" );
            this.listenTo( this.model , "change" , this.render );
        },

        checkContactInfo: function( event ) {
            event.stopImmediatePropagation();
        },

        sendMsg: function( event ) {
            event.stopImmediatePropagation();
        },

        sendGift: function( event ) {
            event.stopImmediatePropagation();
            this.$giftListPanelEl.panel( "open" );
            this.$pageContentEl.addClass( "fixed" );
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


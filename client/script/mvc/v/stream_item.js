//用户信息流中的一条信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,

    "text!tpl/stream_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    UserView ,

    streamTpl
){
    "use strict";

    var StreamItem = Backbone.View.extend({
        className: "item" ,

        events: {
            "tap .check_contact_info": "checkContactInfo" ,
            "tap .send_msg": "sendMsg" ,
            "tap .send_gift": "sendGift" ,
            "tap": "goDetailPage"
        },

        template: streamTpl ,

        //在构造函数中已经设置了 model
        initialize: function() {
            _.bindAll( this , "checkContactInfo" , "sendMsg" , "sendGift" , "goDetailPage" );

            this.model.on( "change" , this.render );
        },

        //@todo 此处其实是有 bug 的, 用户的信息其实已经被加载到
        //了页面中
        checkContactInfo: function( event ) {
            event.stopImmediatePropagation();
            //需要先判断当前登录用户是否已经购买联系方式
            //如果没有购买则尝试购买 如过已经购买则显示之
            
        },

        sendMsg: function( event ) {
            event.stopImmediatePropagation();
            window.router.navigate( "#talk" , {trigger: true} );
        },

        sendGift: function( event ) {
            event.stopImmediatePropagation();

            //跳转到礼品选择页面 并且要保存当前用户的 id 以确定送礼的对象
            window.localStorage.setItem( "send_gift_to" , this.model.get( "UserId" ) );
            window.router.navigate( "#gift_list" , {trigger: true} );
        },

        goDetailPage: function( event ) {
            //保存本用户信息 到本地 
            var userId = this.model.get( "UserId" );
            window.router.navigate(
                "#user_detail/" + userId,
                {
                    trigger: true
                }
            );
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

    return StreamItem;
});


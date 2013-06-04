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
            "tap .display_contact_info_online": "displayOnlineContactInfo" ,
            "tap .display_contact_info_offline": "displayOfflineContactInfo" ,
            "tap .send_msg": "sendMsg" ,
            "tap .send_gift": "sendGift" ,
            "tap": "goDetailPage"
        },

        template: streamTpl ,

        //在构造函数中已经设置了 model
        initialize: function() {
        //{{{
            _.bindAll( this ,
                "displayOnlineContactInfo" , "displayOfflineContactInfo" , "displayContactInfo" ,
                "sendMsg" , "sendGift" , "goDetailPage" );

            //获取两种类型信息的模板 在 stream.html 中
            //@todo 系统通用模板是否有必要单独存放到一起?
            this.onlineContactTpl = $( "#online_contact_info_tpl" ).html();
            this.offlineContactTpl = $( "#offline_contact_info_tpl" ).html();

            this.model.on( "change" , this.render );
        } ,//}}}

        //对于联系方式显示的抽象
        //@param type string [online|offline]
        displayContactInfo: function( type ) {
        //{{{
            $.get(
                "/api/should_display_contact_info/?type=" + type + "&" +
                    "object_user_id=" + window.objectUser.get( "UserId" ) +
                    "&subject_user_id=" + this.model.get( "UserId" ) ,
                $.proxy( function( data ) {
                    var res = JSON.parse( data );
                    if( res.should === "true" ) {
                        //直接显示之
                        $.ui.popup({
                            title: (type === "online" ? "线上" : "线下") + "联系方式",
                            message: Mustache.to_html( this[ type + "ContactTpl"] , this.model.toJSON() ),
                            cancelText: "关闭",
                            cancelOnly: true 
                        });
                    } else {
                        //@todo 将这些定义为 code
                        switch( res.reason ) {
                            case "insufficient coin": 
                                alert( "买金币或vip吧" )
                            break;
                        }
                    }
                }, this ),
                function( data ) {
                    console.dir( data )
                }
            );
        },//}}}

        //@todo 只要判断两种情况就可以了 
        // 1 金币用户 只要购买了之后就可以随时查看
        // 2 vip 用户需要限制其每日的查看次数
        displayOnlineContactInfo: function( event ) {
        //{{{
            event.stopImmediatePropagation();
            //需要判断当前登录用户是否已经购买联系方式
            //如果没有购买则尝试购买 如过已经购买则显示之
            //另外还需要判断是否有电话等线上联系方式
            //$.ui.showMask();
            this.displayContactInfo( "online" );
        },//}}}

        displayOfflineContactInfo: function() {
        //{{{
            event.stopImmediatePropagation();
            //需要判断当前登录用户是否已经购买联系方式
            //如果没有购买则尝试购买 如过已经购买则显示之
            this.displayContactInfo( "offline" );
        },//}}}

        sendMsg: function( event ) {
        //{{{
            event.stopImmediatePropagation();
            window.router.navigate( "#talk_list" , {trigger: true} );
        },//}}}

        sendGift: function( event ) {
        //{{{
            event.stopImmediatePropagation();

            //跳转到礼品选择页面 并且要保存当前用户的 id 以确定送礼的对象
            window.localStorage.setItem( "send_gift_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "#gift_list" , {trigger: true} );
        },//}}}

        goDetailPage: function( event ) {
        //{{{
            //保存本用户信息 到本地 
            var userId = this.model.get( "UserId" );
            window.router.navigate(
                "#user_detail/" + userId,
                {
                    trigger: true
                }
            );
        },//}}}

        render: function() {
        //{{{
            this.$el.html(
                    Mustache.to_html(
                        this.template ,
                        this.model.toJSON()
                        ) 
                    );
            return this;
        }//}}}
    });

    return StreamItem;
});


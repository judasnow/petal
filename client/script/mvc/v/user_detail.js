//用户详细信息页面
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/user_detail.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,

    MenuView ,

    userDetailTpl 
) {
    "use strict";

    $.ui.addContentDiv( "user_detail" , "" );

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,
        el: "#user_detail" ,

        events: {
            "tap .get_contaces_info": "getContacesInfo" ,
            "tap .send_gift": "sendGift" ,
            "tap .send_msg": "sendMsg" ,
            "tap .wanted_gift_list li": "sendThatGift"
        } ,

        initialize: function( data ) {
            new MenuView();

            //需要判断是否是当前登录用户自己的主页
            this.objectUserPage = (typeof data.objectUserPage !== "undefined" ? data.objectUserPage : false );
            var subjectUserId = data.subjectUserId;

            //如果不是当前登录用户自己的页面 触发浏览事件
            if( !this.objectUserPage ) {
                window.socket.emit(
                    "update_brower_status" ,
                    {
                        object_user_id: window.objectUser.get( "UserId" ),
                        subject_user_id: subjectUserId
                    }
                );
            }

            _.bindAll( 
                this , 
                "sendMsg" , "sendGift" , "getContacesInfo" , "sendThatGift" , "render" );

            this.onlineContactTpl = $( "#online_contact_info_tpl" ).html();

            this.model = new User();
            this.model.on( "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: subjectUserId
                }
            });
        } ,

        sendMsg: function() {
            window.router.navigate( "/#chat_list" , {trigger: true} );
        } ,

        sendGift: function() {
            window.localStorage.setItem( "send_gift_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "/#gift_list" , {trigger: true} );
        } ,

        sendThatGift: function( event ) {
        //{{{
            event.stopImmediatePropagation();
            var giftId = $( event.currentTarget ).find( ".gift_id" ).text();

            $.post(
                "/api/send_gift/" ,
                {
                    gift_id: giftId ,
                    target_user_id: this.model.get( "UserId" ) ,
                    from_user_id: window.objectUser.get( "UserId" )
                } ,
                function() {
                    window.updateSysNotice( "金币 -1" );
                    $.ui.popup({ 
                        title: "恭喜",
                        message: "礼物已经成功送出!",
                        cancelText: "关闭", 
                        cancelCallback: function() {
                            
                        },
                        cancelOnly: true
                    });
                    $.ui.hideMask();
                } ,
                function() {
                    alert( "失败" );
                }
            );
        } ,//}}}

        getContacesInfo: function() {
            event.stopImmediatePropagation();
            //@todo 此处有重
            $.get(
                "/api/should_display_contact_info/?type=online&" +
                    "object_user_id=" + window.objectUser.get( "UserId" ) +
                    "&subject_user_id=" + this.model.get( "UserId" ) ,
                $.proxy( function( data ) {
                    var res = JSON.parse( data );
                    if( res.should === "true" ) {
                        //直接显示之
                        $.ui.popup({
                            title: "联系方式",
                            message: Mustache.to_html( this[ "onlineContactTpl"] , this.model.toJSON() ),
                            cancelText: "关闭",
                            cancelOnly: true 
                        });
                    } else {
                        //@todo 将这些定义为 code
                        switch( res.reason ) {
                            case "insufficient coin": 
                                $.ui.popup({
                                    title: "" ,
                                    message: "金币不足,买金币或vip吧" ,
                                    doneCallback: function() {
                                        window.router.navigate( "/#buy_coin" , {trigger: true} );
                                    }
                                });
                            break;
                        }
                    }
                }, this )
            );
        } ,

        render: function() {
            $.ui.updateContentDiv(
                "user_detail" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            if( this.objectUserPage === true ) {
                //若为用户个人主页 则需要进行一些特殊的处理
                //显示编辑按钮 用户点击之后需要变成保存按钮
                $( "header>.update_self_profile" ).show();
                $( "header>h1" ).html( "我的主页" );
            }
            $.ui.loadContent(
                "#user_detail/" +
                ( this.objectUserPage === true ? "self" : this.model.get( "UserId" ) ) , 
                false , 
                false , 

                "fade" 
            );
            return this;
        }
    });

    return UserDetail;
});


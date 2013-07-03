define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/user_detail.html" ,

    "lib/helper" ,
    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,

    MenuView ,

    userDetailTpl ,

    helper ,
    commonOperate
) {
    "use strict";

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,

        events: {
            "click .get_contaces_info": "getContacesInfo" ,
            "click .send_gift": "sendGift" ,
            "click .send_msg": "sendMsg" ,
            "click .wanted_gift_list .gravatar": "sendThatGift" ,
            "click .visitors_list>.sub_item": "goDetailPage"
        } ,

        initialize: function( data ) {
        //{{{
            new MenuView();
            $.ui.tryAddContentDiv( "user_detail" , "" );
            this.$el = $( "#user_detail" );

            //需要判断是否是当前登录用户自己的主页
            this.subjectUserId = data.subjectUserId;
            if( this.subjectUserId == window.objectUser.get( "UserId" ) ) {
                this.isSelfPage = true;
            }

            _.bindAll(
                this , 
                "sendMsg" , "sendGift" , "getContacesInfo" , "sendThatGift" , "render" );

            this.model = new User();
            this.model.set( "isObjectUserPage" , this.isObjectUserPage );
            this.model.on( "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: this.subjectUserId
                }
            });
        } ,//}}}

        sendMsg: function() {
        //{{{
            window.localStorage.setItem( "petal:root_msg_id" , "0" );
            window.localStorage.setItem( "petal:send_msg_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "/#chat_list" , {trigger: true} );
        } ,//}}}

        sendGift: function() {
        //{{{
            window.localStorage.setItem( "send_gift_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "/#gift_list" , {trigger: true} );
        } ,//}}}

        sendThatGift: function( event ) {
        //{{{
            event.stopImmediatePropagation();
            var $subItem = $( event.target ).parent().parent();
            var giftId = $subItem.find( ".gift_id" ).text();
            var price = $subItem.find( ".price b" ).text();

            $.post(
                "/api/send_gift/" ,
                {
                    gift_id: giftId ,
                    target_user_id: this.model.get( "UserId" ) ,
                    from_user_id: window.objectUser.get( "UserId" )
                } ,
                function( data ) {
                    window.updateSysNotice( "金币 -" + price );
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
                    alert( "送礼失败,请稍后再试" );
                }
            );
        } ,//}}}

        getContacesInfo: function() {
        //{{{
            event.stopImmediatePropagation();
            commonOperate.getUserContactInfo( this.model );
        } ,//}}}

        goDetailPage: function( event ) {
            event.stopImmediatePropagation();
            var userId = $( event.target ).attr( "data-user_id" );
            if( !isNaN( userId ) ) {
                window.router.navigate( "/#user_detail/" + userId , {trigger: true} );
            }
        } ,

        render: function() {
        //{{{
            if( this.isSelfPage === true ) {
                this.model.set( "isSelfPage" , true );
            }

            $.ui.updateContentDiv(
                "user_detail" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );

            helper.showImage( this.$el.find( "img" ) );

            if( this.isSelfPage === true ) {
                $( "header>h1" ).html( "我的主页" );
            } else {
                $.get(
                    "/api/update_brower_status/?object_user_id=" 
                        + window.objectUser.get( "UserId" )
                        + "&&subject_user_id=" + this.subjectUserId
                );
            }

            $.ui.loadContent(
                "#user_detail/" + this.model.get( "UserId" ) , 
                false , 
                false , 

                "none" 
            );

            return this;
        }
    });//}}}

    return UserDetail;
});


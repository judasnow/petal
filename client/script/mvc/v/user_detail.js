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
            "tap .get_contaces_info": "getContacesInfo" ,
            "tap .send_gift": "sendGift" ,
            "tap .send_msg": "sendMsg" ,
            "tap .wanted_gift_list .gravatar": "sendThatGift" ,
            "tap .visitors_list>.sub_item": "goDetailPage"
        } ,

        initialize: function( data ) {
        //{{{
            new MenuView();
            this.subjectUserId = data.subjectUserId;

            //为了 history 可以正常使用 必须使用不同的 id
            this.divId = "user_detail-" + this.subjectUserId;

            this.$el = $.ui.addOrUpdateDiv( this.divId , "" );

            //需要判断是否是当前登录用户自己的主页
            if( this.subjectUserId == window.objectUser.get( "UserId" ) ) {
                this.isSelfPage = true;
            }

            _.bindAll(
                this , 
                "sendMsg" , "sendGift" , "getContacesInfo" , "sendThatGift" , "render" );

            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: this.subjectUserId
                }
            });
        } ,//}}}

        sendMsg: function() {
        //{{{
            commonOperate.goChatListPage( this.model );
        } ,//}}}

        sendGift: function() {
        //{{{
            window.localStorage.setItem( "send_gift_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "/#gift_list" , {trigger: true} );
        } ,//}}}

        //赠送其想收到的礼物
        sendThatGift: function( event ) {
        //{{{
            var $subItem = $( event.target ).parent().parent();
            var giftId = $subItem.find( ".gift_id" ).text();
            var price = $subItem.find( ".price b" ).text();
            var targetUserId = this.model.get( "UserId" );

            commonOperate.sendGift( targetUserId , giftId , price );
        } ,//}}}

        getContacesInfo: function() {
        //{{{
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
                this.divId ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );

            $.ui.loadContent(
                this.divId ,
                false , 
                false , 
 
                "none" 
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

            return this;
        }
    });//}}}

    return UserDetail;
});


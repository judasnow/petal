//用户信息流中的一条信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/stream_item.html" ,

    "lib/helper" ,
    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    UserView ,

    streamTpl ,

    helper ,
    commonOperate
){
    "use strict";

    var StreamItem = Backbone.View.extend({
        className: "item" ,

        events: {
            "tap .display_contact_info": "displayContactInfo" ,
            "tap .send_msg": "sendMsg" ,
            "tap .send_gift": "sendGift" ,
            "tap": "goDetailPage"
        },

        template: streamTpl ,

        //在构造函数中已经设置了 model
        initialize: function() {
        //{{{
            _.bindAll( this , "displayContactInfo" ,
                "sendMsg" , "sendGift" , "goDetailPage" );

            //是否显示功能按钮
            if( this.model.get( "UserId" ) !== window.objectUser.get( "UserId" ) ) {
                this.model.set( "needsFunc" , true );
            }
        } ,//}}}

        //对于联系方式显示的抽象
        displayContactInfo: function() {
        //{{{
            event.stopImmediatePropagation();
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            commonOperate.getUserContactInfo( this.model );
        },//}}}

        sendMsg: function( event ) {
        //{{{
            event.stopImmediatePropagation();
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            commonOperate.goChatListPage( this.model );
        },//}}}

        sendGift: function( event ) {
        //{{{
            event.stopImmediatePropagation();
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            //跳转到礼品选择页面 并且要保存当前用户的 id 以确定送礼的对象
            window.localStorage.setItem( "petal:send_gift_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "/#gift_list" , {trigger: true} );
        },//}}}

        goDetailPage: function( event ) {
        //{{{
            //保存本用户信息 到本地 
            var userId = this.model.get( "UserId" );
            window.router.navigate(
                "user_detail/" + userId,
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

            //显示默认图片
            helper.showImage( this.$el.find( "img" ) , this.model.get( "Sex" ) === "男" ? "male" : "female" );

            return this;
        }//}}}
    });

    return StreamItem;
});


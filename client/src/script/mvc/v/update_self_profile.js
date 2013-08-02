//用户个人资料修改页面
//需要注意的是 用户更新的信息中
//图片信息 以及 其他文本信息是分开发送
//到 服务器的 
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,
    "m/user_profile_base_info" ,

    "v/menu" ,

    "text!tpl/update_self_profile.html" ,
    "text!tpl/div/location_select.html" ,
    "text!tpl/div/looks_select.html" ,
    "text!tpl/div/birthday_select.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,
    UserProfileBaseInfo ,

    MenuView ,

    updateSelfProfileTpl ,
    locationSelectTpl ,
    looksSelectTpl ,
    birthdaySelectTpl ,

    helper
) {
    "use strict";

    var UpdateSelfProfile = Backbone.View.extend({
        template: updateSelfProfileTpl ,

        events: {
            "tap .nickname": "editNickname" ,
            
            "tap .sex": "editSex" ,
            "tap .sex .label": "changeSex"
        } ,

        initialize: function() {
        //{{{
            this.$el = $.ui.addOrUpdateDiv( "update_self_profile" , "" );

            _.bindAll(
                this ,
                "render" );

            //每次渲染都需要更新用户信息
            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                },
                error: function() {
                    console.dir( "on #user_self_profile fetch user_info error" );
                }
            });
        } ,//}}}

        //尝试修改 nickname 
        editNickname: function( event ) {
            var $target = $( event.currentTarget );
            var $nicknameInput = $target.find( "input[name='nickname']" );

            $nicknameInput.focus();
        } ,

        //用户点击的不是选择框 则需要提示用户
        editSex: function( event ) {
            var $target = $( event.target );
            if( $target.hasClass( "item" ) ) {
                window.updateSysNotice( "请点击右边的选择框" );
            }
        } ,

        changeSex: function( event ) {
            var $target = $( event.currentTarget );
            var $info = $target.parent();

            //取消所有选择
            $info.find( ".label>i" ).attr( "class" , "icon-check-empty" );
            $target.find( "i" ).attr( "class" , "icon-check" );
        },

        render: function() {
        //{{{
            $.ui.updateContentDiv(
                "update_self_profile" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON() ,
                    {
                        location_select: Mustache.to_html( locationSelectTpl , UserProfileBaseInfo ) ,
                        birthday_select: Mustache.to_html( birthdaySelectTpl , UserProfileBaseInfo ) ,
                        looks_select: Mustache.to_html(
                            looksSelectTpl , 
                            UserProfileBaseInfo[ this.model.get( "isFemale" ) ? "looks_famale" : "looks_male"]
                        )
                    }
                )
            );

            $.ui.loadContent(
                "#update_self_profile" ,
                false ,
                false ,

                "none"
            );

            return this;
        }//}}}
    });

    return UpdateSelfProfile;
});


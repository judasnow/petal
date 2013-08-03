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
    "text!tpl/div/height_select.html" ,
    "text!tpl/div/weight_select.html" ,
    "text!tpl/div/age_select.html" ,

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
    heightSelectTpl ,
    weightSelectTpl ,
    ageSelectTpl ,

    helper
) {
    "use strict";

    var UpdateSelfProfile = Backbone.View.extend({
        template: updateSelfProfileTpl ,

        events: {
        //{{{
            "change .province": "provinceChange" ,

            "tap .nickname": "editNickname" ,
            
            "tap .sex": "editSex" ,
            "tap .sex .label": "changeSex" ,
            
            "tap .location": "editLocation" ,

            "tap .height": "editHeight" ,

            "tap .weight": "editWeight" ,

            "tap .age": "editAge" ,

            //婚姻状况
            "tap .maritalStatus": "goToMaritalStatus" ,

            //职业
            "tap .career": "goToCareer" ,

            //愿意提供
            "tap .offer": "goToOffer" ,

            //想要获得
            "tap .want": "goToWant" ,

            //交友信息
            "tap .info_of_make_friends": "goToInfoOfMakeFriends" ,

            //上传照片
            "tap .uplodaPicture": "goToUploadPicture"
        } ,//}}}

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
        //{{{
            var $target = $( event.currentTarget );
            var $nicknameInput = $target.find( "input[name='nickname']" );

            $nicknameInput.focus();
        } ,//}}}

        //用户点击的不是选择框 则需要提示用户
        editSex: function( event ) {
        //{{{
            var $target = $( event.target );
            if( $target.hasClass( "item" ) ) {
                window.updateSysNotice( "请点击右边的选择框" );
            }
        } ,//}}}

        changeSex: function( event ) {
        //{{{
            var $target = $( event.currentTarget );
            var $info = $target.parent();

            //取消所有选择
            $info.find( ".label>i" ).attr( "class" , "icon-check-empty" );
            $target.find( "i" ).attr( "class" , "icon-check" );
        } ,//}}}

        editLocation: function( event ) {
        //{{{
            var $target = $( event.target );

            var $select = $target.find( ".province" );
            $select.focus();
        } ,//}}}

        provinceChange: function( event ) {
        //{{{
            var $target = $( event.currentTarget );
            var $info = $target.parent();
            var $cityname = $info.find( ".cityname" );
            var $citylist = $info.find( ".citylist" );

            UserProfileBaseInfo.provinceChange(
                { 
                    "$province": $target ,
                    "$cityname": $cityname ,
                    "$citylist": $citylist
                }
            );
        } ,//}}}

        editHeight: function( event ) {
        //{{{
            var $target = $( event.target );

            var $select = $target.find( ".height" );
            $select.focus();
        } ,//}}}

        editWeight: function( event ) {
        //{{{
            var $tagoToInfoOfMakeFriendsrget = $( event.target );

            var $select = $target.find( ".weight" );
            $select.focus();
        } ,//}}}

        editAge: function( event ) {
        //{{{
            var $target = $( event.target );

            var $select = $target.find( ".age" );
            $select.focus();
        } ,//}}}

        goToMaritalStatus: function() {
        //{{{
            //跳转到婚姻状况设置页面
            window.router.navigate( "marital_status" , {trigger: true} );
        } ,//}}}

        goToOffer: function() {
            window.router.navigate( "offer" , {trigger: true} );
        } ,

        goToWant: function() {
            window.router.navigate( "want" , {trigger: true} );
        } ,

        goToInfoOfMakeFriends: function() {
            window.router.navigate( "info_of_make_friends" , {trigger: true} );
        } ,

        goToUploadPicture: function() {
            window.router.navigate( "upload_picture" , {trigger: true} );
        } ,

        goToCareer: function() {
            window.router.navigate( "career" , {trigger: true} );
        } ,

        render: function() {
        //{{{
            $.ui.updateContentDiv(
                "update_self_profile" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON() ,
                    {
                        location_select: Mustache.to_html( locationSelectTpl , UserProfileBaseInfo ) ,
                        height_select: Mustache.to_html( heightSelectTpl , UserProfileBaseInfo ) ,
                        weight_select: Mustache.to_html( weightSelectTpl , UserProfileBaseInfo ) ,
                        age_select: Mustache.to_html( ageSelectTpl , UserProfileBaseInfo )
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


//
// 用户个人资料修改页面
// 需要注意的是 用户更新的信息中
// 图片信息 以及 其他文本信息是分开发送
// 到 服务器的 
//
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

            "tap .career": "editCareer" ,

            "tap .marital_status .label": "editMaritalStatus" ,
            "tap .offer .label": "editOffer" , 
            "tap .want .label": "editWant" , 

            //交友信息
            "tap .info_of_make_friends": "goToInfoOfMakeFriends" ,

            //上传照片
            "tap .uplodaPicture": "goToUploadPicture" ,

            "tap .do_update": "doUpdate"
        } ,//}}}

        initialize: function() {
        //{{{
            this.$el = $.ui.addOrUpdateDiv( "update_self_profile" , "" );

            _.bindAll(
                this ,
                "render" , "editMaritalStatus" , "_setDefaultAttr" , "doUpdate" );

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

        doUpdate: function() {
        //{{{
            var userId = window.objectUser.get( "UserId" );
            var nickname = this.$nicknameInput.val();
            var province = this.$province.val();
            var cityname = this.$cityname.val();
            var height = this.$heightSelect.val();
            var weight = this.$weightSelect.val();
            var age = this.$ageSelect.val();
            var career = this.$careerSelect.val();

            var sex = helper.getCheckLabel( this.$sexItem );
            var marital_status = helper.getCheckLabel( this.$maritalStatusItem );
            var offer = helper.getCheckLabel( this.$offerItem );
            var want = helper.getCheckLabel( this.$wantItem );

            $.post(
                "/api/user/" ,
                {
                    user_id: window.objectUser.get( "UserId" , "" ) ,
                    nickname: nickname ,
                    sex: sex ,
                    area_id: UserProfileBaseInfo.getAreaIdFromCityName( this.$cityname.val() ) ,
                    height: height ,
                    weight: weight ,
                    age: age ,
                    marital_status: marital_status ,
                    offer: offer ,
                    want: want ,
                    career: career
                } ,
                function( data ) {
                    var dataObj = JSON.parse( data );

                    if( dataObj.result === "ok" ) {
                        window.updateSysNotice( "保存成功" );
                        helper.reCalcInfoPercent( userId );
                    } else {
                        window.updateSysNotice( "保存失败,请稍后再试" );
                    }
                } 
            );
        },//}}}

        editNickname: function( event ) {
        //{{{
            var $target = $( event.currentTarget );
            var $nicknameInput = $target.find( "input[name='nickname']" );

            $nicknameInput.focus();
        } ,//}}}

        editSex: function( event ) {
        //{{{
            //用户点击的不是选择框 则需要提示用户
            var $target = $( event.target );
            if( $target.hasClass( "item" ) ) {
                window.updateSysNotice( "请点击右边的选择框" );
            }
        } ,//}}}

        changeSex: function( event ) {
        //{{{
            var $target = $( event.currentTarget );
            var $info = $target.parent();

            helper.clearOtherCheck( $info );
            helper.reverseCheck( $target.find( "i" ) );
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
            var $target = $( event.target );

            var $select = $target.find( ".weight" );
            $select.focus();
        } ,//}}}

        editAge: function( event ) {
        //{{{
            var $target = $( event.target );
            var $select = $target.find( ".age" );

            $select.focus();
        } ,//}}}

        editCareer: function( event ) {
        //{{{
            var $target = $( event.target );
            var $select = $target.find( ".career" );

            $select.focus();
        } ,//}}}

        editMaritalStatus: function( event ) {
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.clearOtherCheck( $div );
            helper.reverseCheck( $i );
        } ,//}}}

        editOffer: function( event ) {
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,//}}}

        editWant: function( event ) {
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,//}}}

        goToInfoOfMakeFriends: function() {
        //{{{
            window.router.navigate( "info_of_make_friends" , {trigger: true} );
        } ,//}}}

        goToUploadPicture: function() {
        //{{{
            window.router.navigate( "upload_picture" , {trigger: true} );
        } ,//}}}

        _setDefaultAttr: function() {
        //{{{
            //nickname
            //{{{
            var $nicknameInput = this.$el.find( "input[name='nickname']" );
            var nickname = this.model.get( "NickName" );
            //对于不存在的属性 Backbone.Model 返回 undefined
            if( typeof nickname !== "undefined" ) {
                $nicknameInput.val( this.model.get( "NickName" ) );
            }
            this.$nicknameInput = $nicknameInput;
            //}}}

            //sex
            //{{{
            var $sexItem = this.$el.find( ".sex" );
            var sex = this.model.get( "sexInEnglish" );
            helper.clearOtherCheck( $sexItem );
            if( sex === "female" ) {
                helper.reverseCheck( $sexItem.find( ".female i" ) );
            } else {
                helper.reverseCheck( $sexItem.find( ".male i" ) );
            }
            this.$sexItem = $sexItem;
            //}}}

            //location
            //{{{
            var $locationItem = this.$el.find( ".location" );
            var $province = $locationItem.find( ".province" );
            var $cityname = $locationItem.find( ".cityname" );
            var locationArray = this.model.get( "location" ).split( " " );
            var province = locationArray[0];
            var cityname = locationArray[1];
            if( typeof province !== "undefined" && province !== "" ) {
                $province.val( province ).trigger( "change" );
                $cityname.val( cityname );
            }
            this.$province = $province;
            this.$cityname = $cityname;
            //}}}

            //height
            //{{{
            var $heightItem = this.$el.find( ".height" );
            var $heightSelect = $heightItem.find( ".height" );
            var height = this.model.get( "SG" );
            if( typeof height !== "undefined" ) {
               $heightSelect.val( height );
            }
            this.$heightSelect = $heightSelect;
            //}}}

            //weight
            //{{{
            var $weightItem = this.$el.find( ".weight" );
            var $weightSelect = $weightItem.find( ".weight" );
            var weight = this.model.get( "weight" );
            if( typeof weight !== "undefined" ) {
                $weightInput.val( weight );
            }
            this.$weightSelect = $weightSelect;
            //}}}

            //age
            //{{{
            var $ageItem = this.$el.find( ".age" );
            var $ageSelect = $ageItem.find( ".age" );
            var age = this.model.get( "age" );
            if( typeof age !== "undefined" ) {
                $ageSelect.val( age );
            }
            this.$ageSelect = $ageSelect;
            //}}}

            //career
            //{{{
            var $careerItem = this.$el.find( ".career" );
            var $careerSelect = $careerItem.find( ".career" );
            var career = this.model.get( "ZY" );
            if( typeof career !== "undefined" ) {
                $careerSelect.val( career );
            }
            this.$careerSelect = $careerSelect;
            //}}}

            //marital_status
            //{{{
            var $maritalStatusItem = this.$el.find( ".marital_status" );
            var marital_status = this.model.get( "HY" );
            helper.setCheckByValue( $maritalStatusItem , marital_status );
            this.$maritalStatusItem = $maritalStatusItem;
            //}}}

            //offer
            //{{{
            var $offerItem = this.$el.find( ".offer" );
            var offer = this.model.get( "TG1" );
            helper.setCheckByValue( $offerItem , offer );
            this.$offerItem = $offerItem;
            //}}}

            //want
            //{{{
            var $wantItem = this.$el.find( ".want" );
            var want = this.model.get( "HD1" );
            helper.setCheckByValue( $wantItem , want );
            this.$wantItem = $wantItem;
            //}}}

        } ,//}}}

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

            this._setDefaultAttr();

            return this;
        }//}}}
    });

    return UpdateSelfProfile;
});


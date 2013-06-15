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
    "text!tpl/div/looks_select.html"
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
    looksSelectTpl
) {
    "use strict";
    $.ui.addContentDiv( "update_self_profile" , "" );

    var UpdateSelfProfile = Backbone.View.extend({
        template: updateSelfProfileTpl ,

        el: "#update_self_profile",

        events: {
            "tap .add_picture": "openFileSelectDialog" ,
            "tap .user_picture_box": "tapPicture" ,

            "change .user_upload_picture_input": "fileNameChanged" ,
            "change .province": "provinceChange" ,
            "change .zwms": "setUserHasChangedInfo" ,
            "change .birthday": "setUserHasChangedInfo" ,
            "change .looks": "setUserHasChangedInfo" ,
        } ,

        initialize: function() {
        //{{{
            new MenuView();
            _.bindAll(
                this ,
                "render" ,
                "openFileSelectDialog" , "fileNameChanged" , "provinceChange" , "doUpdate" , "checkChangeAndGoBack" );

            this.model = new User();
            this.model.on( "change" , this.render );

            //待上传图片
            this.files = [];

            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                },
                error: function() {
                    console.dir( "on #user_self_profile fetch user_info error" );
                }
            });

            this.userPictureBoxTpl = $( "#user_picture_box_tpl" ).html();

            window.doUpdate = this.doUpdate;
        },//}}}

        setUserHasChangedInfo: function() {
            this.userhasChangedInfo = true;
        },

        checkChangeAndGoBack: function() {
            //判断用户是否已经修改了自己的信息
            if( this.userhasChangedInfo === true ) {
                $.ui.popup({
                    title: "" ,
                    message: "离开本页将丢失修改，是否确认离开？",
                    doneCallback: function() {
                        $.ui.goBackWithDefault();
                    }
                });
            } else {
                $.ui.goBackWithDefault();
            }
        } ,

        provinceChange: function() {
            this.userhasChangedInfo = true;
            $.proxy( UserProfileBaseInfo.provinceChange , this )();
        } ,

        doUpdate: function() {
        //{{{
            $.ui.showMask( "提交中" );
            var userId = window.objectUser.get( "UserId" );

            if( typeof this.files !== "undefined" ) {
                //没有找到一次发送全部文件的方法 只能一次发送一张
                for( var i = 0 ; i < this.files.length ; i++ ) {
                    var xhr = new XMLHttpRequest();
                    var formData = new FormData();
                    formData.append( "user_upload_picture" , this.files[i] );
                    formData.append( "user_id" , userId )
                    xhr.open( "POST" , "/api/upload_files" , true );
                    xhr.send( formData );
                }
            }
            if( this.userhasChangedInfo === true ) {
                $.post( 
                    "/api/user/" ,
                    {
                        user_id: userId ,
                        area_id: UserProfileBaseInfo.getAreaIdFromCityName( this.$cityname.val() ),
                        zwms: this.$zwms.val() ,
                        looks: this.$looks.val() ,
                        birthday: this.$birthday.val()
                    } ,
                    function( data ) {
                        alert( "保存成功" );
                        window.router.navigate( "/#stream" , {trigger: true} );
                    },
                    function( data ) {
                        alert( "保存失败" )
                    }
                );
            }
            $.ui.hideMask();
        } ,//}}}

        tapPicture: function() {

        } ,

        openFileSelectDialog: function() {
        //{{{
            this.$fileInput = this.$el.find( ".user_upload_picture_input" ).click();
        } ,//}}}

        //用户添加了新图片
        fileNameChanged: function() {
        //{{{
            this.userhasChangedInfo = true;
            if( typeof this.$userUploadFile === "undefined" ) {
                this.$userUploadFile = this.$el.find( ".user_upload_picture_input" );
            }
            if( typeof this.$album === "undefined" ) {
                this.$album = this.$el.find( ".user_album" );
            }
            //将用户选择的图片展示给用户
            var self = this;
            var files = this.$userUploadFile[0].files;
            var $album = this.$album;

            //遍历全部的 files
            var filesCount = files.length;
            for( var i = 0 ; i < filesCount ; i++ ) {
                var reader = new FileReader();
                reader.onload = function( e ) {
                    $album.prepend(
                        Mustache.to_html(
                            self.userPictureBoxTpl ,
                            {
                                //删除图片时使用 直接从数据库中读取的 图片就用 name 作为 uid
                                uid: i ,
                                image: e.target.result
                            }
                        )
                    );
                };
                this.files.push( files[i] );
                reader.readAsDataURL( files[i] );
            }
        },//}}}

        render: function() {
        //{{{
            $.ui.updateContentDiv(
                "update_self_profile" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON() ,
                    {
                        location_select: Mustache.to_html( locationSelectTpl , UserProfileBaseInfo ) ,
                        looks_select: Mustache.to_html( looksSelectTpl , UserProfileBaseInfo[(this.model.get( "UserSex" ) === "女") ? "looks_famale" : "looks_male"] )
                    }
                )
            );
            $.ui.loadContent(
                "#update_self_profile" ,
                false , 
                false , 

                "fade" 
            );

            $( $( "#header .button" )[0]).bind( "tap" , this.checkChangeAndGoBack );

            this.$cityname = this.$el.find( ".cityname" );
            this.$userId = this.$el.find( ".user_id" );
            this.$zwms = this.$el.find( ".zwms" );
            this.$birthday = this.$el.find( ".birthday" );
            this.$looks = this.$el.find( ".looks" );

            return this;
        }//}}}
    });

    return UpdateSelfProfile;
});


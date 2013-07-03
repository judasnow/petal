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

    helper
) {
    "use strict";

    var UpdateSelfProfile = Backbone.View.extend({
        template: updateSelfProfileTpl ,

        events: {
            "click .add_picture": "openFileSelectDialog" ,
            "click .user_picture_box": "clickPicture" ,
            "click .looks .label": "clickLabel" ,

            "change .user_upload_picture_input": "fileNameChanged" ,
            "change .province": "provinceChange" ,
            "change .zwms": "setUserHasChangedInfo" ,
            "change .birthday": "setUserHasChangedInfo" ,
        } ,

        initialize: function() {
        //{{{
            $.ui.reAddContentDiv( "update_self_profile" , "" );
            this.$el = $( "#update_self_profile" );

            _.bindAll(
                this ,
                "render" ,
                "openFileSelectDialog" , "fileNameChanged" , "provinceChange" , "doUpdate" , "checkChangeAndGoBack" , "clickLabel" );

            //待上传图片
            this.files = [];

            this.userPictureBoxTpl = $( "#user_picture_box_tpl" ).html();

            window.doUpdate = this.doUpdate;

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

        //用户点击了外貌标签
        clickLabel: function( event ) {
        //{{{
            var $el = $( event.target );
            var $input = $el.find( "input" );

            if( $el.hasClass( "label_active" ) ) {
                //已经激活则取消
                $el.removeClass( "label_active" );
            } else {
                //还没有被激活则激活之
                $el.addClass( "label_active" );
            }

            //设置被隐藏的输入框
            if( $input.attr( "checked" ) === "true" ) {
                $input.removeAttr( "checked" );
            } else {
                $input.attr( "checked" , "true" );
            }

            this.userhasChangedInfo = true;
        } ,//}}}

        setUserHasChangedInfo: function() {
        //{{{
            this.userhasChangedInfo = true;
        } ,//}}}

        //用户已经修改了本页的信息后将准备离开本页面的情况
        checkChangeAndGoBack: function() {
        //{{{
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
        } ,//}}}

        provinceChange: function() {
        //{{{
            this.userhasChangedInfo = true;
            $.proxy( UserProfileBaseInfo.provinceChange , this )();
        } ,//}}}

        clickPicture: function() {
        //{{{
        } ,//}}}

        openFileSelectDialog: function() {
        //{{{
            //@todo 似乎是 scroller 变卡的原因
            this.$fileInput.trigger( "click" );;
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
            var files = this.$userUploadFile[0].files;files
            var $album = this.$album;

            if( files.length > 0 ) {
                var file = files[0];
                if( file.size > 2048000 ) {
                    alert( "上传的图片太大了,图片大小不能超过 2M" );
                    return;
                }

                var reader = new FileReader();
                reader.onload = function( e ) {
                    $album.prepend(
                        Mustache.to_html(
                            self.userPictureBoxTpl ,
                            {
                                //删除图片时使用 直接从数据库中读取的 图片就用 name 作为 uid
                                uid: (new Date()).getTime() ,
                                image: e.target.result
                            }
                        )
                    );
                }

                this.files.push( files[0] );
                reader.readAsDataURL( files[0] );
            }
        },//}}}

        doUpdate: function() {
        //{{{
            var looks = _.reduce( 
                this.$looks.find( "input:checked" ) , 
                function( memo , el ) {
                    return memo + " " + $(el).val();
                } ,
                ""
            );

            var userId = window.objectUser.get( "UserId" );

            //@todo 目前来说发送错误是没有提示的
            if( typeof this.files !== "undefined" ) {
                //没有找到一次发送全部文件的方法 只能一次发送一张
                //base64 发送
                for( var i = 0 ; i < this.files.length ; i++ ) {
                    var xhr = new XMLHttpRequest();
                    var formData = new FormData();
                    formData.append( "user_upload_picture" , this.files[i] );
                    formData.append( "user_id" , userId );
                    xhr.open( "POST" , "/api/upload_files" );
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
                        looks: looks
                    } ,
                    function( data ) {
                        var dataObj = JSON.parse( data );
                        if( dataObj.result === "ok" ) {
                            window.updateSysNotice( "保存成功" );

                            //更新本地的 objectUser 信息
                            //暂时为了获取格式化信息 需要重新获取
                            //一次用户信息
                            var newObjectUser = new User();
                            newObjectUser.fetch({
                                data: {
                                    user_id: userId
                                },
                                success: function( model ) {
                                    window.objectUser = model;
                                    window.localStorage.setItem( "petal:object_user_info" , JSON.stringify( model.toJSON() ) );
                                    window.router.navigate( "/#stream" , {trigger: true} );
                                },
                                error: function() {
                                    //手动 reload 一次？
                                    console.log( "save ok, fetch user info error" );
                                }
                            });
                        } else {
                            alert( "保存失败,请稍后再试一次" );
                        }
                    },
                    function( data ) {
                        alert( "保存失败,请稍后再试一次" );
                    }
                );
            } else {
                alert( "保存成功" );
                window.router.navigate( "/#stream" , {trigger: true} );
            }
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

            $( $( "#header .button" )[0] ).bind( "click" , this.checkChangeAndGoBack );

            this.$province = this.$el.find( ".province" );
            this.$cityname = this.$el.find( ".cityname" );
            this.$userId = this.$el.find( ".user_id" );
            this.$zwms = this.$el.find( ".zwms" );
            this.$looks = this.$el.find( ".looks" );
            this.$fileInput = this.$el.find( ".user_upload_picture_input" );

            helper.showImage( this.$el.find( "img" ) );

            //根据用户之前的信息初始化页面
            //城市信息
            var locationArray = this.model.get( "location" ).split( " " );
            var province = locationArray[0];
            var cityname = locationArray[1];
            if( province != "" ) {
                this.$province.val( province ).trigger( "change" );
                this.$cityname.val( cityname );
            }

            //外貌
            var looksArray = this.model.get( "WM" ).split( " " );
            var $looks = this.$looks;
            _.each( looksArray , function( item ) {
                if( item !== "" ) {
                    $looks.find( "input[value=" + item + "]" ).parent().trigger( "click" );
                }
            });

            //由于会自动设置 用户已经修改了页面 因此需要在这里将其还原
            this.userhasChangedInfo = false;

            return this;
        }//}}}
    });

    return UpdateSelfProfile;
});


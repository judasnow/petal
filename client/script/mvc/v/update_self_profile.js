//用户详细信息页面
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,
    "m/user_profile_base_info" ,

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

    updateSelfProfileTpl ,
    locationSelectTpl ,
    looksSelectTpl
) {
    "use strict";
    //先添加一个占位 panel
    $.ui.addContentDiv( "update_self_profile" , "" );

    var UpdateSelfProfile = Backbone.View.extend({
        template: updateSelfProfileTpl ,

        el: "#update_self_profile",

        events: {
            "tap .add_picture": "openFileSelectDialog" ,
            "change .user_upload_picture_input": "fileNameChanged"
        } ,

        initialize: function() {
            _.bindAll( 
                this , "render" , 
                "openFileSelectDialog" , "fileNameChanged" , "bindAlbumEvent" );

            this.model = new User();
            this.model.on( "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                } ,
                success: $.proxy( function() {
                    this.$album = this.$el.find( ".user_album" );
                    this.$uploadInput = this.$el.find( ".user_upload_picture_input" );
                    this.userPictureBoxTpl = $( "#user_picture_box_tpl" ).html();
                    this.bindAlbumEvent();
                } , this )
            });
        } ,

        //为每一个用户上传的图片绑定事件
        bindAlbumEvent: function() {
            this.$album.find( ".user_picture_box" ).unbind( "tap" ).on( "tap" , function(){
                alert( "删除" );
            });
        } ,

        openFileSelectDialog: function() {
            this.$fileInput = this.$el.find( ".user_upload_picture_input" ).click();
        } ,

        fileNameChanged: function() {
            //将用户选择的图片展示给用户
            var self = this;
            var files =  this.$uploadInput[0].files;
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
                    self.bindAlbumEvent();
                };
                reader.readAsDataURL( files[i] );
            }
            self.bindAlbumEvent();
        },

        render: function() {
            $.ui.updateContentDiv(
                "update_self_profile" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON() ,
                    {
                        location_select: locationSelectTpl ,
                        looks_select: looksSelectTpl
                    }
                )
            );
            $.ui.loadContent(
                "#update_self_profile" ,
                false , 
                false , 

                "fade" 
            );
            return this;
        }
    });

    return UpdateSelfProfile;
});


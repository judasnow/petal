define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/upload_picture.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    uploadPictureTpl
){
    "use strict";

    var UploadPicture = Backbone.View.extend({
        template: uploadPictureTpl ,

        events: {
            "tap .add_picture": "openFileSelectDialog" ,
            "change .user_upload_picture_input": "fileNameChanged"
        } ,
 
        initialize: function() {
        //{{{
            this.$el = $.ui.addOrUpdateDiv( "upload_picture" , "" );

            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                }
            });

            this.files = [];
            this.userPictureBoxTpl = $( "#user_picture_box_tpl" ).html();
        } ,//}}}

        openFileSelectDialog: function() {
        //{{{
            //@todo 似乎是 scroller 变卡的原因
            this.$fileInput.trigger( "click" );
        } ,//}}}

        //用户添加了新图片
        fileNameChanged: function() {
        //{{{
            this.userhasChangedInfo = true;

            if( typeof this.$album === "undefined" ) {
                this.$album = this.$el.find( ".user_album" );
            }

            //将用户选择的图片展示给用户
            var self = this;
            var files = this.$fileInput[0].files;
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

        render: function () {
            $.ui.updateContentDiv(
                "upload_picture" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#upload_picture" ,
                false ,
                false , 

                "none" 
            );

            this.$fileInput = this.$el.find( ".user_upload_picture_input" );

            return this;
        }
    });

    return UploadPicture;
});



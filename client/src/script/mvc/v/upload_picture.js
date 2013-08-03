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
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "upload_picture" , "" );

            this.model = new User();
            this.render();
        } ,

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
            return this;
        }
    });

    return UploadPicture;
});



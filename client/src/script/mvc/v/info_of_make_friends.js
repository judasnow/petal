define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/info_of_make_friends.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    infoOfMakeFirendsTpl
){
    "use strict";

    var InfoOfMakeFirends = Backbone.View.extend({
        template: infoOfMakeFirendsTpl ,
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "info_of_make_friends" , "" );

            this.model = new User();
            this.render();
        } ,

        render: function () {
            $.ui.updateContentDiv(
                "info_of_make_friends" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#info_of_make_friends" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }
    });

    return InfoOfMakeFirends;
});



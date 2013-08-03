define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/want.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    wantTpl
){
    "use strict";

    var Want = Backbone.View.extend({
        template: wantTpl ,
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "want" , "" );

            this.model = new User();
            this.render();
        } ,

        render: function () {
            $.ui.updateContentDiv(
                "want" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#want" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }
    });

    return Want;
});



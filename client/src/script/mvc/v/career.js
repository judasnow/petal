define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/career.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    careerTpl
){
    "use strict";

    var Career = Backbone.View.extend({
        template: careerTpl ,
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "career" , "" );

            this.model = new User();
            this.render();
        } ,

        render: function () {
            $.ui.updateContentDiv(
                "career" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#career" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }
    });

    return Career;
});



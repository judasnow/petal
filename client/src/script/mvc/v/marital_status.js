define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/marital_status.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    maritalStatusTpl
){
    "use strict";

    var maritalStatus = Backbone.View.extend({
        template: maritalStatusTpl ,
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "marital_status" , "" );

            this.model = new User();
            this.render();
        } ,

        render: function () {
            $.ui.updateContentDiv(
                "marital_status" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#marital_status" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }
    });

    return maritalStatus;
});



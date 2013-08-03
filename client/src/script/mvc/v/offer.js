define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/offer.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    offerTpl
){
    "use strict";

    var Offer = Backbone.View.extend({
        template: offerTpl ,
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "offer" , "" );

            this.model = new User();
            this.render();
        } ,

        render: function () {
            $.ui.updateContentDiv(
                "offer" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#offer" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }
    });

    return Offer;
});



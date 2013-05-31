define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/coupons.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    couponsTpl
) {
    "use strict";

    $.ui.addContentDiv( "coupons" , "" );

    var Coupons = Backbone.View.extend({
        template: couponsTpl ,

        el: "#coupons" ,

        initialize: function() {
            this.model = window.objectUser;
            $.ui.updateContentDiv( 
                "coupons" ,
                Mustache.to_html(
                    this.template ,
                    window.objectUser.toJSON()
                )
            );
            $.ui.loadContent( "#coupons/self" , false , false , "fade" );
        }
    });

    return Coupons;
});


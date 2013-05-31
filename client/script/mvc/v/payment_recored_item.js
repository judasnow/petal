define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/payment_recored_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    paymentRecoredItemTpl
){
    "use strict";

    var PaymentRecoredItem = Backbone.View.extend({
        className: "item",
        template: paymentRecoredItemTpl ,

        initialize: function() {

        },
        
        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );
            return this;
        }
    });

    return PaymentRecoredItem;
});

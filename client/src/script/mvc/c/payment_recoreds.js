define([
    "underscore" ,
    "backbone" ,
    "m/payment_record_item"
],
function( 
    _ ,
    Backbone,
    PaymentRecordItemModel
){
    "use strict";

    var PaymentRecoreds = Backbone.Collection.extend({
        model: PaymentRecordItemModel,

        url: "/api/payment_recoreds/",

        initialize: function() {
            
        }

    });

    return PaymentRecoreds;
});



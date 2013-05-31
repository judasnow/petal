define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/payment_recoreds" ,

    "v/payment_recored_item" ,
    "v/stream_base" ,

    "text!tpl/payment_record.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    PaymentRecoreds ,

    PaymentRecoredItemView ,
    StreamBase ,

    paymentRecordTpl
){
    "use strict";

    var PaymentRecord = StreamBase.extend({
        initialize: function( args ) {
            var paymentRecoreds = new PaymentRecoreds();
            this.baseInitialize( "payment_record" , paymentRecordTpl , PaymentRecoredItemView , paymentRecoreds , args.q , args.hash );
        } 
    });

    return PaymentRecord;
});

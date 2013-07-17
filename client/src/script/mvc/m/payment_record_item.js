define([
    "underscore" ,
    "backbone" ,
    
    "lib/helper" ,

    "date_utils"
],
function( 
    _ ,
    Backbone ,

    helper
){
    "use strict";

    var PaymentRecordItem = Backbone.Model.extend({
        initialize: function() {
            this.set( 
                "time" ,
                helper.resetTime( this.get( "CreateAt" ) ) 
            );

            this.set( "PvMsg" , this.get( "PvMsg" ).replace( /<[^>].*?>/g , "" ) );
        }
    });

    return PaymentRecordItem;
});



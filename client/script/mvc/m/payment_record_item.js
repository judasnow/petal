define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var PaymentRecordItem = Backbone.Model.extend({
        initialize: function(){
            var createAt = new Date( this.get( "CreateAt" ) );
            this.set( "time" , createAt.getFullYear() + "/" + createAt.getMonth() + "/" + createAt.getDate() );

            this.set( "PvMsg" , this.get( "PvMsg" ).replace( /<[^>].*?>/g , "" ) );
        }
    });

    return PaymentRecordItem;
});



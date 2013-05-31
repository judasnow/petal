define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/buy_vip.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    buyVipTpl
){
    "use strict";

    $.ui.addContentDiv( "buy_vip" , "" );

    var BuyVip = Backbone.View.extend({
        template: buyVipTpl ,

        el: "#buy_vip",

        initialize: function() {
            $.ui.updateContentDiv( "buy_vip" , this.template );
            $.ui.loadContent( "#buy_vip" , false , false , "fade" );
        } ,

        render: function() {
            return this;
        }
    });

    return BuyVip;
});

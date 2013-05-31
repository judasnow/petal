define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/buy_coin.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    buyCoinTpl
){
    "use strict";

    $.ui.addContentDiv( "buy_coin" , "" );

    var BuyCoin = Backbone.View.extend({
        template: buyCoinTpl ,

        el: "#buy_coin",

        initialize: function() {
            $.ui.updateContentDiv( "buy_coin" , this.template );
            $.ui.loadContent( "#buy_coin" , false , false , "fade" );
        } ,

        render: function() {
            return this;
        }
    });

    return BuyCoin;
});

define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "v/menu" ,

    "text!tpl/buy_coin.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    MenuView ,

    buyCoinTpl
){
    "use strict";

    var BuyCoin = Backbone.View.extend({
        template: buyCoinTpl ,

        initialize: function() {
            new MenuView();

            $.ui.tryAddContentDiv( "buy_coin" , "" );
            this.render();

            this.$el = $( "#buy_coin" );
            this.$el.find( ".sub_item .des" ).bind( "tap" , function( e ) {
                console.dir( $( this ).parent().find( "input" )[0].checked = true );
            });
        } ,

        render: function() {
            $.ui.updateContentDiv(
                "buy_coin" , 
                Mustache.to_html( 
                    this.template , 
                    window.objectUser.toJSON() 
                )
            );
            $.ui.loadContent( "#buy_coin" , false , false , "fade" );
            return this;
        }
    });

    return BuyCoin;
});

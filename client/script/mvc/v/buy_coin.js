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
        events: {
            "click .sub_item_inner": "activeIt"
        } ,

        initialize: function() {
            new MenuView();

            _.bindAll( this , "unactiveOthers" , "activeIt" );

            $.ui.tryAddContentDiv( "buy_coin" , "" );
            this.render();

            this.$el = $( "#buy_coin" );
            this.$el.find( ".sub_item .des" ).bind( "tap" , function( e ) {
                console.dir( $( this ).parent().find( "input" )[0].checked = true );
            });
        } ,

        unactiveOthers: function() {
            _.each(
                this.$el.find( ".sub_item_inner" ) , 
                function( el ) {
                    $(el).removeClass( "active" )
                        .find( "input" ).attr( "checked" , false );
                }
            )
        } ,

        activeIt: function( event ) {
            this.unactiveOthers();
            var $el = $( event.target );
            if( $el.hasClass( "des" ) ) {
                $el = $el.parent();
            }
            $el.find( "input" ).attr( "checked" , true );
            if( $el.hasClass( "active" ) ) {
                $el.removeClass( "active" );
            } else {
                $el.addClass( "active" );
            }


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

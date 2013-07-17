define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "v/menu" ,

    "text!tpl/service.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    MenuView ,

    serviceTpl
){
    "use strict";

    var Service = Backbone.View.extend({
        template: serviceTpl ,

        initialize: function() {
            new MenuView();
            _.bindAll( this , "render" );
            this.$el = $.ui.addOrUpdateDiv( "service" , "" );
            this.render();
        } ,

        render: function() {
            $.ui.updateContentDiv(
                "service" ,
                this.template 
            );
            $.ui.loadContent( 
                "#service" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }
    });

    return Service;
});

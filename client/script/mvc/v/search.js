define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/search.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    searchTpl ,
    headerTpl ,
    footerTpl 
){
    "use strict";

    var Search = Backbone.View.extend({
        template: searchTpl ,
        initialize: function() {
            this.baseInitialize();

            this.events = $.extend({
                
            } , this.baseEvents );

            this.$el.append(
                Mustache.to_html(
                    this.template ,
                    {
                        header: headerTpl,
                        footer: footerTpl,
                        main_panel: mainPanelTpl
                    }
                )
            );

        },

        render: function(){
            return this;
        }
    });
    return Search;
});


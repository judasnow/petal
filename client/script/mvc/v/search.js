define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" ,
    "text!tpl/search.html" ,
    "text!tpl/main_panel.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html" ,
    "v/main_panel",
] ,
function(
    $ ,
    _ ,
    Backbone ,
    Mustache ,
    socket ,
    searchTpl ,
    mainPanelTpl ,
    headerTpl ,
    footerTpl ,
    MainPanelView
){
    "use strict";

    var Search = MainPanelView.extend({
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


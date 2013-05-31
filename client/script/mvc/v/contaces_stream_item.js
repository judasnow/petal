define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,

    "text!tpl/contaces_stream_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    UserView ,

    contaceStreamItemTpl
){
    "use strict";

    var ContaceStreamItem = Backbone.View.extend({
        className: "item" ,

        template: contaceStreamItemTpl ,

        initialize: function() {
 
        },

        render: function() {
            this.$el.html(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                    ) 
                );
            return this;
        }
    });

    return ContaceStreamItem;
});


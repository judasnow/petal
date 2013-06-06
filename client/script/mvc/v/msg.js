define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/msg.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    msgTpl 
){
    "use strict";

    var Msg = Backbone.View.extend({
        className: "item" ,
        template: msgTpl ,

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

    return Msg;
});



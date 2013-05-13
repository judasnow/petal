//用户信息流中的一条信息
define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" ,
    "text!tpl/stream_item.html"
] ,
function(
    $ ,
    _ ,
    Backbone ,
    Mustache ,
    socket ,
    streamTpl
){
    "use strict";

    var StreamItem = Backbone.View.extend({
        className: "item",

        template: streamTpl ,

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );
            return this;
        }
    });

    return StreamItem;
});


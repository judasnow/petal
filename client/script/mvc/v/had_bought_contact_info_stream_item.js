//用户信息流中的一条信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/stream_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    UserView ,

    MenuView ,

    hadBoughtContactInfoStreamItemTpl
){
    "use strict";

    var HadBoughtContactInfoStreamItem = Backbone.View.extend({
        className: "item" ,

        template: hadBoughtContactInfoStreamItemTpl ,

        initialize: function() {

        } ,

        render: function() {
            new MenuView();
            this.$el.html(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            return this;
        }
    });

    return HadBoughtContactInfoStreamItem;
});


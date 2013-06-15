define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/sys_notice.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    sysNoticeTpl 
){
    "use strict";

    var sysNotice = Backbone.View.extend({
        template: sysNoticeTpl ,

        initialize: function( data ) {
            this.content = data.content || "";
            _.bindAll( this , "render" );
        },

        render: function() {
            var $el = this.$el;
            this.$el.html(
                Mustache.to_html(
                    this.template ,
                    { content: this.content }
                ) 
            );
            return this;
        }
    });

    return sysNotice;
});



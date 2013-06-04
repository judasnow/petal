//最近联系人的信息记录
define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/talk_items" ,
    "v/talk_item" ,

    "text!tpl/talk_list.html" 
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    TalkItems ,
    TalkItemView ,

    talkListTpl 
){
    "use strict";
    $.ui.addContentDiv( "#talk_list" , "" );

    var TalkList = Backbone.View.extend({
        template: talkListTpl ,

        el: "#talk_list" ,

        initialize: function() {
            this.render();
        },
        render: function() {
            $.ui.updateContentDiv( "talk_list" , this.template );
            $.ui.loadContent( "#talk_list" , false , false , "fade" );
            return this;
        }
    });

    return TalkList;
});


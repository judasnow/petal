define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "c/users" ,
    "v/stream_item" ,
    "v/stream_base" ,
    "v/menu" ,

    "text!tpl/stream.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Users ,
    ScreamItemView ,
    StreamBase ,
    MenuView ,

    streamTpl 
){
    "use strict";

    var Stream = StreamBase.extend({
        initialize: function( args ) {
            //此处需要注意的问题是 没有显式渲染的 menu 是不会显示的
            //除非之前的一个页面已经渲染了他
            var users = new Users();

            //@todo 对于其他页面上的用户流 这个名字可能会冲突
            this.baseInitialize( "stream" , streamTpl , ScreamItemView , users , args.q , args.hash );

            var menuView = new MenuView();
        } 
    });

    return Stream;
});



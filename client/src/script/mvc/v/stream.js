define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/users" ,

    "v/stream_item" ,
    "v/stream_base" ,

    "v/menu" ,

    "text!tpl/stream.html",
    "lib/helper"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    Users ,

    ScreamItemView ,
    StreamBase ,

    MenuView ,

    streamTpl,
    helper
){
    "use strict";

    var Stream = StreamBase.extend({
        initialize: function( args ) {
            new MenuView();

            $.ui.clearHistory();

            //此处需要注意的问题是 没有显式渲染的 menu 是不会显示的
            //除非之前的一个页面已经渲染了他
            var users = new Users();

            helper.reCalcInfoPercent( window.objectUser.get( "UserId" ) );

            this.baseInitialize( "stream" , streamTpl , ScreamItemView , users , args.q , args.hash );
            if( window.localStorage.getItem( "petal:is_new_login" ) === "true" ){
                window.localStorage.setItem( "petal:is_new_login" , "false" );
                $.ui.toggleSideMenu();
            }
        }
    });

    return Stream;
});



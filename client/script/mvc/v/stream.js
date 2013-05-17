// 用户列表 
// 承载了多个 url 
define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" ,

    "text!tpl/stream.html" ,
    "text!tpl/main_panel.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html" ,
    "text!tpl/stream_show_more.html" ,

    "v/main_panel" ,
    "c/users" ,
    "v/stream_item" ,
    "jqmobi"
] ,
function(
    $ ,
    _ ,
    Backbone ,
    Mustache ,
    socket ,

    streamTpl ,
    mainPanelTpl ,
    headerTpl ,
    footerTpl ,
    streamShowMoreTpl ,

    MainPanelView ,
    Users ,
    StreamItemView 
){
    "use strict";

    //这里的 Stream.$el 指代整个 stream 页面
    //而非 div#stream
    var Stream = MainPanelView.extend({
        template: streamTpl ,

        initialize: function() {
        //{{{
            this.baseInitialize();

            this.events = $.extend({
                "tap .stream_show_more": "showMore"
            }, this.baseEvents );

            _.bindAll( this , "addOne" , "addAll" , "showMore" , "fetchOk" , "fetchFail" );

            this.$el.append(
                Mustache.to_html(
                    this.template ,
                    {
                        header: headerTpl ,
                        footer: footerTpl ,
                        main_panel: mainPanelTpl
                    }
                )
            );

            //初始化 header 上的按钮
            this.$el.find( "#head_left_btn" ).click( 
                    function() {
                        $( "#main_panel" ).panel( "toggle" );
                    });
            this.$el.find( "#head_right_btn" ).hide();

            this.$streamEl = this.$el.find( ".stream" );
            this.$itemsEl = this.$streamEl.find( ".items" );
            this.$showMoreEl = this.$streamEl.find( ".stream_show_more" );

            //初始化用户列表
            this.p = 1;
            this.users = new Users();
            this.users.bind( "add" , this.addOne );
            this.users.bind( "reset" , this.addAll );
            this.users.fetch({
                data: {
                    p: 1
                },
                success: this.fetchOk,
                error: this.fatchFail
            });
        },//}}}

        addAll: function() {
            this.users.each( this.addOne );
        },

        addOne: function( item ) {
            var itemView = new StreamItemView({ model: item });
            this.$itemsEl.append( itemView.render().el );
        },

        fetchOk: function( coll , res ){
        //{{{
            //@todo 这里需要进行正确性的判断
            //返回值不一定有效
            if( coll.length > 0 ) {
                this.isFetching = false;
                this.$showMoreEl.text( "查看更多" );
            } else {
                this.$showMoreEl.text( "没有更多了" );
            }
        },//}}}

        fetchFail: function( coll , res ) {
        //{{{
            this.$showMoreEl.text( "查看更多" );
        },//}}}

        showMore: function() {
        //{{{
            //避免用户重复点击
            if( this.isFetching === true ) {
                return false;
            }

            this.isFetching = true;
            this.$showMoreEl.text( "正在加载" );
            this.p = this.p + 1;
            this.users.fetch({
                data: {
                    p: this.p
                },
                success: this.fetchOk,
                error: this.fatchFail
            });
        },//}}}

        render: function() {
        //{{{
            return this;
        }//}}}
    });

    return Stream;
});


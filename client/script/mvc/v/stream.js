// 用户列表 
// 承载了多个 url 
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/stream.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html" ,
    "text!tpl/stream_show_more.html" ,

    "c/users" ,
    "v/stream_item" ,
    "v/menu"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    streamTpl ,
    headerTpl ,
    footerTpl ,
    streamShowMoreTpl ,

    Users ,
    StreamItemView ,
    MenuView
){
    "use strict";

    //这里的 Stream.$el 指代整个 stream 页面
    //而非 div#stream
    var Stream = Backbone.View.extend({
        className: "panel" ,
        template: streamTpl ,

        initialize: function() {
        //{{{
            _.bindAll( this , "addOne" , "addAll" , "fetchOk" , "fetchFail" );

            $.ui.addContentDiv( "stream" , this.template , "用户列表" );
            $.ui.removeFooterMenu();
            this.$el = $( "#stream" );

            this.$itemsEl = this.$el.find( ".items" );
            this.$showMoreEl = this.$el.find( ".stream_show_more" );

            var menuView = new MenuView();

            //初始化用户列表
            this.p = 1;
            this.users = new Users();
            this.users.bind( "add" , this.addOne );
            this.users.bind( "reset" , this.addAll );
            this.users.fetch();

            var streamView = this;
            var scroll = this.$el.scroller();
            scroll.addInfinite();
            scroll.addPullToRefresh();
            //刷新
            $.bind( scroll , "refresh-trigger" , function() {
                this.setRefreshContent( "松吧" );
            });
            var hideClose;
            $.bind( scroll , "refresh-release" , function(){
                var that = this;
                //目前只刷新第一页
                streamView.users.fetch();
                this.setRefreshContent( "刷新中..." );
                clearTimeout( hideClose );
                hideClose=setTimeout( function(){
                    that.hideRefresh();
                } , 3000 );
                return false; 
            });
            //获取更多
            $.bind( scroll , "infinite-scroll" , function() {
                streamView.showMore();
                var self = this;
                $( this.el ).append( "<div class='infinite'>读取中...</div>" );
                $.bind( scroll , "infinite-scroll-end" , function() {
                    //获取完毕
                    $.unbind( scroll , "infinite-scroll-end" );
                    setTimeout( function() {
                        $( self.el ).find( ".infinite" ).remove();
                        self.clearInfinite();
                    } , 3000 );
                });
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

        //刷新当前的列表
        //目前想得到的实现办法就是 从当前列表中 取最新的记录 
        //和数据库中的记录进行比对 但是对于差异很大的数据 现在
        //还没有一个比较好的方案 
        //but 由于数据库中的信息是存在一个顺序的 
        refresh: function() {
            
        },

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


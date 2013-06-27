//对于列表形式的一个封装
define([
    "underscore" ,
    "backbone" ,
    "mustache" 
] ,
function(
    _ ,
    Backbone ,
    Mustache 
){
    "use strict";

    var StreamBase = Backbone.View.extend({
        //指定了每一个 stream 都必将是一个 panel
        className: "panel" ,

        //@param streamId 需要渲染的流 dom id
        //@param tpl 需要渲染的流的模板
        //@param title 需要渲染的模板的标题
        //@param q 查询条件
        //@param hash 需要跳转的 history hash 
        baseInitialize: function( streamId , tpl , ItemView , coll , q , hash ) {
        //{{{
            this.q = q;
            this.coll = coll;
            this.ItemView = ItemView;
            _.bindAll( this , "addOne" , "addAll" , "fetchOk" , "fetchFail" );

            this.$el = $.ui.tryAddContentDiv( streamId , tpl );
            $.ui.loadContent( hash , true , false , "fade" );

            //每一个 streamTpl 都必须包含一个 .items 元素 
            this.$itemsEl = this.$el.find( ".items" );

            //初始化用户列表
            this.p = 1;
            this.coll.bind( "add" , this.addOne );
            this.coll.bind( "reset" , this.addAll );
            this.fetchMore();

            var streamView = this;
            var scroll = this.$el.scroller();
            this.scroll = scroll;
            scroll.addInfinite();

            //刷新
            $.bind( scroll , "refresh-trigger" , function() {
                this.setRefreshContent( "松吧" );
            });
            var hideClose;
            $.bind( scroll , "refresh-release" , function() {
                var that = this;
                //目前只刷新第一页
                //streamView.fetchMore();
                this.setRefreshContent( "刷新中..." );
                clearTimeout( hideClose );
                hideClose=setTimeout( function() {
                    that.hideRefresh();
                } , 2000 );
                return false;
            });

            //获取更多
            $.bind( scroll , "infinite-scroll" , function() {
                var self = this;
                $( this.el ).append( "<div class='infinite'>读取中...</div>" );
                streamView.fetchMore();
                $.bind( scroll , "infinite-scroll-end" , function() {
                    //获取完毕
                    $.unbind( scroll , "infinite-scroll-end" );
                    setTimeout( function() {
                        $( self.el ).find( ".infinite" ).remove();
                        self.clearInfinite();
                    } , 1000 );
                });
            });
        },//}}}

        addAll: function() {
            this.coll.each( this.addOne );
        },

        addOne: function( item ) {
            var itemView = new this.ItemView({ model: item });
            this.$itemsEl.append( itemView.render().el );
        },

        fetchOk: function( coll , res ) {
        //{{{
            //@todo 这里需要进行正确性的判断hash
            //返回值不一定有效
            if( coll.length > 0 ) {
                this.isFetching = false;
            } else {
                $.unbind( this.scroll , "infinite-scroll" );
            }
        },//}}}

        fetchFail: function( coll , res ) {
        //{{{

        },//}}}

        //刷新当前的列表
        //目前想得到的实现办法就是 从当前列表中 取最新的记录 
        //和数据库中的记录进行比对 但是对于差异很大的数据 现在
        //还没有一个比较好的方案
        //but 由于数据库中的信息是存在一个顺序的
        refresh: function() {
            
        },

        fetchMore: function() {
        //{{{
            //避免用户重复点击
            if( this.isFetching === true ) {
                return false;
            }
            this.isFetching = true;
            this.coll.fetch({
                data: {
                    p: this.p ,
                    q: (typeof this.q === "undefined" || this.q === "" ? {} : this.q)
                } ,
                success: this.fetchOk,
                error: this.fatchFail
            });
            this.p = this.p + 1;
        }//}}}
    });

    return StreamBase;
});


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

            //用来判断当首次加载的时候就没有相应记录的情况
            this.firstFetch = true;

            _.bindAll( this , "addOne" , "addAll" , "fetchOk" , "fetchFail" );

            $.ui.tryAddContentDiv( streamId , tpl );
            $.ui.loadContent( hash , false , false , "none" );
            this.$el = $( "#" + streamId );

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
                    } , 500 );
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
            if( coll.length > 0 ) {
                this.isFetching = false;
                this.firstFetch === false;
            } else {
                //如果是首次自动的加载 一条记录都没有 则
                //提示用户
                if( this.firstFetch === true ) {
                    window.updateSysNotice( "没有相应的记录" );
                }
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


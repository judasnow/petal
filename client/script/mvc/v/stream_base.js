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
            //不能放到函数之外的原因在于 
            //事前不能确认是哪个 streamId
            $.ui.addOrUpdateDiv( streamId , tpl );
            $.ui.loadContent( hash , false , false , "none" );
            this.$el = $( "#" + streamId );
            this.$el.unbind();

            this.q = q;
            this.coll = coll;
            this.ItemView = ItemView;

            //用来判断当首次加载的时候就没有相应记录的情况
            this.firstFetch = true;

            _.bindAll(
                this , 
                "addOne" , "addAll" , "fetchOk" , "fetchFail" , "fetchMore" );

            //每一个 streamTpl 都必须包含一个 .items 元素 
            this.$items = this.$el.find( ".items" );

            //初始化用户列表
            this.p = 1;
            this.coll.bind( "add" , this.addOne );
            this.coll.bind( "reset" , this.addAll );
            this.fetchMore();

            this.$fetchMore = this.$el.find( ".fetch_more" );
            this.listenTo( this.$fetchMore , "tap" , this.fetchMore );
        },//}}}

        addAll: function() {
            this.coll.each( this.addOne );
        },

        addOne: function( item ) {
            var itemView = new this.ItemView({ model: item });
            this.$items.append( itemView.render().el );
        },

        fetchOk: function( coll , res ) {
        //{{{
            if( coll.length > 0 ) {
                this.isFetching = false;
                this.firstFetch = false;
            } else {
                //如果是首次自动的加载 一条记录都没有 则
                //提示用户
                if( this.firstFetch === true ) {
                    window.updateSysNotice( "没有相应的记录" );
                    this.$items.text( "没有相应的记录" );
                    this.$fetchMore.hide();
                } else {
                    window.updateSysNotice( "没有更多了" );
                    this.stopListening( this.$fetchMore , "tap" , this.fetchMore );
                    this.$fetchMore.addClass( "disable" ).text( "没有更多了" );
                }
            }
        },//}}}

        fetchFail: function( coll , res ) {
        //{{{
            window.updateSysNotice( "加载失败了,稍候再试一次吧。" );
        },//}}}

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


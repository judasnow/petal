//@todo 将通用的点击显示更多功能予以封装
define([ 
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" 
],
function( 
    $ , 
    _ , 
    Backbone ,
    Mustache ,
    socket 
){
    "use strict";

    var GetMore = Backbone.View.extend({
        pageNo: 1 ,
        addOne: function( item ) {
            var view = new View({ model: item });
            $el.append( view.render().el );
        },

        addAll: function() {
            console.dir(  arguments[0].coll )
            arguments[0].coll.each( this.addOne );
        },

        getMore: function( coll ) {
            this.pageNo = this.pageNo + 1;
            coll.fetch({
                data: {
                    p: this.pageNo
                },
                success: function() {

                },
                error: function() {

                }
            });
        }
    });

    return GetMore;
});

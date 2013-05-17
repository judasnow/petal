//将通用的点击显示更多功能予以封装
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
    var GetMore = {
        pageNo: 1,
        addOne: function( item , View ) {
            var view = new View({ model: item });
            this.$itemsEl.append( view.render().el );
        }
    };
    return GetMore;
});

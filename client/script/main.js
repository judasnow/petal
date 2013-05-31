require.config({
    baseUrl: "/script/" ,
    paths: {
        //requirejs plugins
        text: "lib/text" ,

        //libs
        underscore: "lib/underscore" ,
        backbone: "lib/backbone" ,
        backbonelocalstore: "lib/backbone.localStorage-min" ,
        mustache: "lib/mustache" ,

        router: "router" ,

        tpl: "mvc/tpl/" ,
        v: "mvc/v/" ,
        m: "mvc/m/" ,
        c: "mvc/c"
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [ "underscore" ],
            exports: "Backbone",
            init: function() {
                Backbone.$ = window.$;
            }
        },
        mustache: {
            exports: "Mustache"
        }
    }
});

//根据当前是否存在本 panel 来决定是
//插入还是 更新相应的元素 并返回当前
//panel 的引用
$.ui.addOrUpdateDiv = function( id , content ) {
    //不能使用 add 这一点很重要!
    var funcName = "addContentDiv";

    if( $( "#" + id ).length !== 0 ) {
        funcName = "updateContentDiv";
    }
    $.ui[funcName](
        id ,
        content
    );
    return $( "#" + id );
}

//远程 console.dir

require([
    "app" ,
] ,
function( app ) {
    app.initialize();
});

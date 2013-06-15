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


require([
    "app" 
] ,
function( app ) {
    //解决 id 相同的元素更新问题
    $.ui.tryAddContentDiv = function( id , content ) {
        if( $( "#" + id ).length !== 0 ) {
            $( "#" + id ).remove();
        }

        $.ui.addContentDiv (
            id ,
            content
        );

        return $( "#" + id );
    }
    $.ui.goBackWithDefault = function() {
        if( $.ui.history.length === 1 ) {
            window.router.navigate( "#stream" , {trigger: true} );
        } else {
            $.ui.goBack();
        }
    };

    app.initialize();
});

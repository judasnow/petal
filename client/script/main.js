require.config({
    baseUrl: "script/" ,
    paths: {
        app: "app" ,

        //requirejs plugins
        text: "lib/text" ,

        //libs
        underscore: "lib/underscore" ,
        backbone: "lib/backbone" ,
        mustache: "lib/mustache" ,
        date_utils: "lib/date-utils" ,

        router: "router" ,

        tpl: "mvc/tpl" ,
        v: "mvc/v" ,
        m: "mvc/m" ,
        c: "mvc/c"
    },
    shim: {
        backbone: {
            deps: [ "underscore" ],
            exports: "Backbone",
            init: function() {
                Backbone.$ = window.$;
            }
        },
        underscore: {
            exports: "_"
        },
        mustache: {
            exports: "Mustache"
        },
        date_utils: {
            exports: "date_utils"
        }
    }
});


require([
    "app"
] ,
function( app ) {
    app.initialize();
});

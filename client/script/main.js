require.config({
    baseUrl: "/script_build/" ,
    paths: {
        //requirejs plugins
        text: "lib/text" ,

        //libs
        underscore: "lib/underscore" ,
        backbone: "lib/backbone" ,
        mustache: "lib/mustache" ,
        date_utils: "lib/date-utils" ,

        router: "router" ,

        tpl: "/script/mvc/tpl/" ,
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

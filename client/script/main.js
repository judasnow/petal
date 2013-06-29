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
        date_utils: "lib/date-utils.min" ,

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

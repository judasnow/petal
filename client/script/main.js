require.config({
    baseUrl: "/script/",
    paths: {
        //requirejs plugins
        text: "lib/text",

        //libs
        jquery: "lib/jquery-1.9.1.min",
        jqm: "lib/jquerymobile/jquery.mobile-1.3.1.min", 
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        backbonelocalstore: "lib/backbone.localStorage-min",
        backboneiosync: "lib/backbone.iosync",
        backboneiobind: "lib/backbone.iobind",
        mustache: "lib/mustache",
        socketio: "lib/socket.io",
        lazyload: "lib/jquery.lazyload.min",
        transit: "lib/jquery.transit.min",

        socketioinit: "socketio.init",

        router: "router",

        tpl: "mvc/tpl/",
        v: "mvc/v/",
        m: "mvc/m/",
        c: "mvc/c"
    },
    shim: {
        jqm: {
            deps: [ "jquery" ]
        },
        transit: {
            deps: [ "jquery" ] 
        },
        lazyload: {
            deps: [ "jquery" ]
        },
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [ "underscore" , "jquery" ],
            exports: "Backbone"
        },
        backboneiosync: {
            deps: [ "backbone" ]
        },
        backboneiobind: {
            deps: [ "backbone" ]
        },
        backbonelocalstore: {
            deps: [ "backbone" ]
        },
        mustache: {
            exports: "Mustache"
        }
    }
});

require( 
    [ "app" ] ,
    function( app ) {
        app.initialize();
    }
);

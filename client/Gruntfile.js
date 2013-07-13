module.exports = function( grunt ) {
    grunt.initConfig({
        pkg: grunt.file.readJSON( "package.json" ) ,

        clean: {
        //{{{
            script_build: [ "script_build/*.js" ],
            script_build: [ "style_build/*.css" ]
        },//}}}

        uglify: {
        //{{{
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today( "yyyy-mm-dd" ) %> */\n'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: "script/",
                    src: ["*.js", "mvc/*.js" , "lib/*.js"],
                    dest: "script_build/",
                    ext: ".js"
                }]
            }
        } ,//}}}

        cssmin: {
        //{{{
            combine: {
                files: {
                    "style_build/css/main.min.css": ["style/css/icons.css","style/css/jq.ui.css","style/css/main.css","script/third_part/cubiq-add-to-homescreen/style/add2home.css"]
                }
            }
        },//}}}

        less: {
        //{{{
            options: {
                compress: false
            } ,
            main: {
                src: "style/less/main.less" ,
                dest: "style/css/main.css"
            }
        },//}}}

        concat: {
        //{{{
            js: {
                src: ["script_build/lib/appframework.js" , "script_build/lib/jqmobiui.js" , "script_build/init.js" , "/script/third_part/cubiq-add-to-homescreen/src/add2home.js"] ,
                dest: "script_build/all.js"
            } ,
            css: {
                
            }
        },//}}}

        requirejs: {
        //{{{
            app: {
                options: {
                    baseUrl: "./script/",
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
                    },
                    name: "main",
                    out: "script_build/rquirejs_main_build.js"
                }
            }
        },//}}}

        watch: {
        //{{{
            js: {
                files: "script/*.js" ,
                tasks: ["default"]
            }
        },//}}}

        manifest: {
        //{{{
            generate: {
                options: {
                    basePath: '.',
                    //cache: ["script/app.js"] ,
                    network: ['http://*', 'https://*', "*"],
                    fallback: [],
                    exclude: [],
                    preferOnline: true,
                    verbose: true,
                    timestamp: true
                },
                src: [
                    "script_build/all.js" ,
                    "script_build/rquirejs_main_build.js",
                    "style_build/css/main.min.css"
                ],
                dest: 'petal.mf'
            }
        },//}}}

        htmlmin: {
        //{{{
            dist: {
                options: {
                    removeComments: true ,
                    collapseWhitespace: true
                } ,
                files: {
                    "html_build/index.html": "index.html"
                }
            }
        }//}}}
    });

    grunt.loadNpmTasks( "grunt-contrib-less" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-requirejs" );
    grunt.loadNpmTasks( "grunt-manifest" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );
    grunt.loadNpmTasks( "grunt-contrib-htmlmin" );

    grunt.registerTask( 
        "default" , 
        [ "clean" , "uglify" , "less" , "cssmin" , "concat" , "requirejs" ]
    );
};

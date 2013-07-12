module.exports = function( grunt ) {
    grunt.initConfig({
        pkg: grunt.file.readJSON( "package.json" ) ,
        clean: {
            script_build: [ "script_build/*.js" ],
            script_build: [ "style_build/*.css" ]
        },
        uglify: {
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
        } ,
        cssmin: {
            combine: {
                files: {
                    "style_build/css/main.min.css": ["style/css/icons.css","style/css/jq.ui.css","style/css/main.css","script/third_part/cubiq-add-to-homescreen/src/add2home.js"]
                }
            }
        },
        less: {
            options: {
                compress: false
            } ,
            main: {
                src: "style/less/main.less" ,
                dest: "style/css/main.css"
            }
        },
        concat: {
            js: {
                src: ["script_build/lib/appframework.js" , "script_build/lib/jqmobiui.js" , "script_build/init.js" , "/script/third_part/cubiq-add-to-homescreen/src/add2home.js"] ,
                dest: "script_build/all.js"
            } ,
            css: {
                
            }
        },
        requirejs: {
            app: {
                options: {
                    baseUrl: ".",
                    appDir: "script/",
                    dir: "script/",
                    modules: [
                    ],
                    paths: {
                        app: "app" ,

                        text: "lib/text" ,

                        underscore: "lib/underscore" ,
                        backbone: "lib/backbone" ,
                        mustache: "lib/mustache" ,
                        date_utils: "lib/date-utils" ,

                        router: "router" ,

                        tpl: "mvc/tpl" ,
                        v: "mvc/v" ,
                        m: "mvc/m" ,
                        c: "mvc/c"
                    }
                }
            }
        },
        watch: {
            js: {
                src: "script/*.js" ,
                tasks: [ "concat" ]
            },
            css: {
                files: "style/less/*.less" ,
                tasks: [ "less" ]
            }
        },
        manifest: {
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
                    'script/*.js' ,
                    'script/lib/*.js' ,
                    'script/mvc/m/*.js',
                    'script/mvc/v/*.js',
                    'script/mvc/c/*.js',
                    'script/mvc/tpl/*.html',

                    'style/css/*.css'
                ],
                dest: 'petal.mf'
            }
         }
    });

    grunt.loadNpmTasks( "grunt-contrib-less" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-requirejs" );
    grunt.loadNpmTasks( "grunt-manifest" );
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask( "default" , [ "clean" , "uglify" , "less" , "cssmin" , "concat" ] );
};

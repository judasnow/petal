module.exports = function( grunt ) {
    grunt.initConfig({
        pkg: grunt.file.readJSON( "package.json" ) ,
        clean: {
            script_build: [ "script_build/*.js" ],
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today( "yyyy-mm-dd" ) %> */\n'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: "script/",
                    src: ["mvc/*.js" , "lib/*.js"],
                    dest: "script_build/",
                    ext: ".js"
                }]
            }
        } ,
        less: {
            options: {
                compress: true
            } ,
            main: {
                src: "style/less/main.less" ,
                dest: "style/css/main.css"
            }
        },
        concat: {
            js: {
                src: ["script_build/lib/jqmobi.js" , "script_build/init.js"] ,
                dest: "script_build/jqmobi_and_init.js"
            } ,
            css: {
                
            }
        },
        requirejs: {
            app: {
                options: {
                    mainConfigFile: "script/main.js",
                    out: "script_build/optimized.js",
                    findNestedDependencies: true,
                    baseUrl       : 'script',
                    name          : 'app',
                    //out           : 'build.js',
                    optimize      : 'none'
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

    grunt.registerTask( "default" , [ "uglify" , "less" ] );
};

var cluster = require( "cluster" )
    , os = require( "os" );

if( cluster.isMaster ) {

    for( var i = 0 ; i < os.cpus().length ; i++ ) {
        cluster.fork();
    }
    cluster.on( "exit" , function( worker , code , signal ) {
        console.log( "workes " + worker.process.pid + " died" );
        cluster.fork();
    });

} else {

    var env = process.argv[2] || "development"
        , config = require( "./config/config" )[env]
        , express = require( "express" )
        , redis = require( "redis" )

        , app = express()
        , server = require( "http" ).createServer( app )

        , helper = require( "./lib/helper" );

    server.listen( config.appPort || 8800 );

    app.use( express.bodyParser() );

    require( "./config/express" )( app , config );
    require( "./config/routes" )( app , config );

    exports = module.exports = app;
}

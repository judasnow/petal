var cluster = require( "cluster" )
    , os = require( "os" )
    , _ = require( "underscore" )
    
    , express = require( "express" )

    , config = require( "./config/config" )["dev"]
    , helper = require( "./lib/helper" );

if (cluster.isMaster) {
    for( var i = 0 ; i < os.cpus().length ; i++ ) {
        cluster.fork();
    }
    cluster.on( "exit" , function( worker , code , signal ) {
        console.log( "workes " + worker.process.pid + " died" );
        cluster.fork();
    });
} else {
    var app = express()
        , server = require( "http" ).createServer( app )
        , redis = require( "redis" );

    server.listen( config.port || 8800 );

    var redisClient = redis.createClient( "6379" , config.redisServer );

    app.use( express.bodyParser() );

    require( "./config/express" )( app , config );
    require( "./config/routes" )( app );

    exports = module.exports = app;
}

//{{{
var cluster = require( "cluster" )
    , os = require( "os" )
    
    , express = require( "express" )

    , crypto = require( "crypto" )
    , redis = require( "redis" )
    , fs = require( "fs" )

    , thirdPartServer = require( "./config/third_part_server" )
    , config = require( "./config/config" )["dev"]
    , helper = require( "./lib/helper" );
//}}}


//if (cluster.isMaster) {
//    for( var i = 0 ; i < os.cpus().length ; i++ ) {
//        cluster.fork();
//    }
//    cluster.on( "exit" , function( worker , code , signal ) {
//        console.log( "workes " + worker.process.pid + " died" );
//    });
//} else {
    var app = express()
        , server = require( "http" ).createServer( app )
        , io = require( "socket.io" ).listen( server );
    server.listen( config.port || 8800 );

    //middlewares
    //{{{
    app.use( express.bodyParser() );
    //}}}

    require( "./config/express" )( app , config );
    require( "./config/routes" )( app );

    //worker 
    //{{{
    //require( "./worker/msg_worker" )( config );
    //}}}
//}

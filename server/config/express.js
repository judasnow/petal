var express = require( "express" )
    , RedisStore = require( 'connect-redis' )( express );

module.exports = function( app , config ) {

    app.set( "showStackError" , true);

    app.use( express.compress({
        filter: function ( req , res ) {
            return /json|text|javascript|css/.test( res.getHeader( "Content-Type" ) )
        } ,
        level: 9
    }))

    app.use( express.cookieParser() );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use(
        express.session({
            secret: "petal",
                store: new RedisStore({
                    host: config.redisServer.address,
                    port: config.redisServer.port,
                    db: "petal"
                })
        })
    );

    app.use( express.static( config.root + "/public" ) );
    app.use( express.compress() );
    app.use( app.router );
}

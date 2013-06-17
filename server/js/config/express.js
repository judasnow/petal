var express = require( "express" );

module.exports = function( app , config ) {
    app.set('showStackError', true);
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
    }))
    //app.use(express.favicon());
    app.use( express.static( config.root + "/public" ) )
    app.use( express.compress() )
    app.use( app.router)
}

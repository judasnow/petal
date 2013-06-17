var path = require( "path" )
    , rootPath = path.normalize( __dirname + "/.." );

module.exports = {
    dev: {
        rootPath: rootPath ,
        port: 8800
    },
    production: {
        rootPath: rootPath
    }
}

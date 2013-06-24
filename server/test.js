var mongo = require( "mongodb" );
var fs = require( "fs" );
var host = "172.17.0.46";
var port = "27017";

var URL = require('url'),
    sURL = 'http://nodejs.org/logo.png',
    oURL = URL.parse(sURL),
    http = require('http'),
    client = http.createClient(80, oURL.hostname),
    request = client.request('GET', oURL.pathname, {'host': oURL.hostname})
;
 
request.end();
request.on('response', function (response)
{
    var type = response.headers["content-type"],
        prefix = "data:" + type + ";base64,",
        body = "";
 
    response.setEncoding('binary');
    response.on('end', function () {
        var base64 = new Buffer(body, 'binary').toString('base64'),
            data = prefix + base64;
        console.log(data);
    });
    response.on('data', function (chunk) {
        if (response.statusCode == 200) body += chunk;
    });
});

/*
var db = new mongo.Db( "test" , new mongo.Server( host , port , {}) , {});

fs.readFile('uploads/115018070002163ee8l.jpg', function (err, data) {
    f = new mongo.Binary(data);
    db.open( function(err , db) {
    db.collection( "users" , function( err , collection ) {
        collection.insert({ "name": "test", data: f },function( err , docs ) {
        });
    });
    db.collection( "users" , function( err , coll ) {
        coll.findOne({ "name": "test" },function( err , docs ) {
            console.dir( docs.data.toString('base64') );
        });
    });
});
});

*/

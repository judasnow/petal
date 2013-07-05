//resize and smaush img
var imagemagick = require( "imagemagick" ) 
    , smushit = require( "node-smushit" )
    , http = require( "http" )
    , fs = require( "fs" );

//get raw img from http://huaban123.com
var tempFile = fs.createWriteStream( "./051337422656.jpg" )
http.get( "http://huaban123.com/UploadFiles/UPP/201307/051337422656.jpg" , 
    function( res ) {
        res.on( "data" , 
            function( data ) {
                tempFile.write( data );
            }
        );
        console.log("Got response: " + res.statusCode );
    }
).on( "error" , 
    function( err ) {
        console.log( "Got error: " + err.message );
    }
);

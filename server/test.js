var async = require( "async" );

async.eachSeries(
    [1, 2, 3, 4, 5, 6, 7, 8, 9] , 
    function( item ) {
        setTimeout( function() {
            console.dir( item );
        }, item * 1000 );
    } ,
    function( error ) {
        console.log( "error" );
    }
);

var hello = function(name, callback){
    setTimeout(function(){
        callback(null, {hello: name});
    }, 1000);
};

async.dir( hello , "123" );

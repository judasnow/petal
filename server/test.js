var async = require( "async" );
var x = function() { 
    this.name = ‘Freewind’; 
} 
var hello = function(name, callback) { 
    setTimeout(function() { 
        callback(null, ‘hello ‘ + name, ‘nice to see you ‘ + name, x, {a:’123′}); 
    }, 200); 
};
async.log(hello, ‘world’);

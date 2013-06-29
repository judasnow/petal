var http=require('http');
var qs=require('querystring');
 
var post_data={
    username: 'uutest',
    password: 'uutest'
};

var content=qs.stringify(post_data);
 
var options = {
    host: '172.17.0.20:1979/mobile/api.aspx?about=user',
  port: 80,
  path: '/post.php',
  method: 'POST',
  headers:{
  'Content-Type':'application/x-www-form-urlencoded',
  'Content-Length':content.length
  }
};
console.log("post options:\n",options);
console.log("content:",content);
console.log("\n");
 
var req = http.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
  var _data='';
  res.on('data', function(chunk){
     _data += chunk;
  });
  res.on('end', function(){
     console.log("\n--->>\nresult:",_data)
   });
});
 
req.write(content);
req.end();

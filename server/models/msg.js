var mongoose = require('mongoose');

var Msg = new mongoose.Schema({
    "id": Number,
    "content": String,
    "targetUserId": Number ,
    "targetUserNickname": String ,
    //object ?
    "objectUserId": Number ,
    "time": Date ,
    "rootMsgId": Number ,
    "isRead": Boolean
});

mongoose.model( "Msg" , Msg );


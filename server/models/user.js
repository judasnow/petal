var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: Number ,

    username: String ,
    password: String ,
    nickname: String ,
    sex: String ,
    birthday: Date ,
    tweet: String 
});

mongoose.model( "User" , UserSchema );

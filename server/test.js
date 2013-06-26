var Q = require( "q" )
var mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.46/test');
var conn = mongoose.connection;
 
var users = conn.collection('users');
var channels = conn.collection('channels');
var articles = conn.collection('articles');
 
var insertUsers = Q.nfbind(users.insert.bind(users));
var insertChannels = Q.nfbind(channels.insert.bind(channels));
var insertArticles = Q.nfbind(articles.insert.bind(articles)); 
 
function getInsertedArticles(usersArray) {
    return insertUsers(usersArray).then(function (insertedUsers) {
        var channelsArray = insertedUsers.map(function (user) {
            return { userId: user._id };
        });
        return insertChannels(channelsArray).then(function (insertedChannels) {
            var articlesArray = insertedChannels.map(function (channel, i) {
                return { userId: users[i]._id, channelId: channel.id };
            });
            return insertArticles(articlesArray);
        });
    });
}
 
getInsertedArticles({foo: 123}).then(
    function (insertedArticles) {
        // you only get here if all three of the above steps succeeded
    },
    function (error) {
        // you get here if any of the above three steps failed
    }
)
.done();

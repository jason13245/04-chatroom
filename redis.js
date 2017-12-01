const redis = require('redis');
const client = redis.createClient({
    host:'localhost',
    port:6379
});
client.on('error',function(err){
    console.log(err);
});

module.exports=client;
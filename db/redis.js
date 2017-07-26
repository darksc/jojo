/**
 * author     dark
 * date       17/6/16
 */
const redis = require("redis"),
      client = redis.createClient({
        host: '192.168.0.123',
        port: 16379,
        password: 'hduptech@2017'
      }),
      bluebird = require("bluebird")

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
  console.log("Error " + err)
})

client.on("connect", function () {
  console.log("redis connection has been established successfully. ")
})
module.exports = client

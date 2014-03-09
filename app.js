/* global require:true, console:true, process:true, __dirname:true */
'use strict'

// Example run command: `node app.js redis 9000 6380 true`; listen on port 9000, connect to redis on 6380, debug printing on.

var express     = require('express')
  , http        = require('http')
  , redis       = require('redis')
  , levelup     = require('level')
  , dboption    = process.argv[2] || 'redis'
  , port        = process.argv[3] || 8000
  , rport       = process.argv[4] || 6379
  , debug       = process.argv[5] || null
  , save
  , leveldb
  , redisClient

if ( dboption == 'redis' ) {
 
  //Redis database setup
  redisClient = redis.createClient(rport)

  redisClient.on('connect', function() {
    console.log('Connected to redis.')
  })

  //Redis data handling
  save = function save(d) {
    redisClient.hmset(d.postId, d)
    if ( debug )
      console.log('Saved to redis: ' + d.postId + ', at: ' + (new Date()).toString())
  }
} 

//Database setup and data handling for leveldb
else {
  
  //Leveldb database setup
  leveldb = levelup('./leveldb', { valueEncoding: 'json' } )
  console.log('Creating levelup database.')

  //Leveldb data handling
  save = function save(d) {
    leveldb.put(d.postId, d)
    if ( debug )
        console.log('Saved to leveldb: ' + d.postId + ', at: ' + (new Date()).toString())
  }
}

// Server setup
var app = express()
app.use(express.bodyParser())
app.use(express.static(__dirname + '/public'))

// Handle POSTs from frontend
app.post('/', function handlePost(req, res) {
  // Get experiment data from request body
  var d = req.body
  // If a postId doesn't exist, add one (it's random, based on date)
  if (!d.postId) d.postId = (+new Date()).toString(36)
  // Add a timestamp
  d.timestamp = (new Date()).getTime()
  // Save the data to our database
  save(d)
  // Send a 'success' response to the frontend
  res.send(200)
})

// Create the server and tell which port to listen to
http.createServer(app).listen(port, function (err) {
  if (!err) console.log('Listening on port ' + port)
})
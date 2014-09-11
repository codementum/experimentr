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
  , db

db = dboption === 'level' ? levelup('./leveldb', { valueEncoding: 'json' } ) : redis.createClient(rport)

//Redis data handling
var save = function save(d) {
  put(d.postId, d)
  if ( debug ) console.log('Saved to ' +dboption+ ' : ' + d.postId + ', at: ' + (new Date()).toString())
}

function put(key, value) {
  db.hmset
  db.put
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

app.get('/data', function()

    hgetall

// Create the server and tell which port to listen to
http.createServer(app).listen(port, function (err) {
  if (!err) console.log('Listening on port ' + port)
})

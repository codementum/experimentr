/* global require:true, console:true, process:true, __dirname:true */
'use strict'

var express     = require('express')
  , http        = require('http')
  , fs          = require('fs')
  , port        = process.argv[2] || 8000
  , redis       = require('redis')
  , redisClient

redisClient = redis.createClient()

redisClient.on('connect', function() {
  console.log('Connected to redis.')
})

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Length, Content-Type, Date')
  next()
}

var app = express()
app.use(express.bodyParser())
app.use(allowCrossDomain)
app.use(express.static(__dirname + '/public'))

app.post('/', function handlePost(req, res) {
  var d = req.body
  if (!d.postId) d.postId = (+new Date()).toString(36)
  d.timestamp = (new Date()).getTime()
  saveRedis(d)
  res.send(200)
})

var saveRedis = function saveRedis(d) {
  redisClient.hmset(d.postId, d)
  console.log('saved to redis: ' + d.postId +', at: '+ (new Date()).toString())
}

http.createServer(app).listen(port, function (err) {
  if (!err) console.log('Listening on port ' + port)
})

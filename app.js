/* global require:true, console:true, process:true, __dirname:true */
'use strict';

var express  = require('express')
  , http     = require('http')
  , csv      = require('csv')
  , json2csv = require('json2csv')
  , fs       = require('fs')
  , redis    = require('redis')
  , redisClient
  , dataDir  = 'userdata/';


var output = 'redis'; // 'csv' or 'redis'
var host   = 'local'; // 'appfog' or 'local'
var port   = '8000';

// setup for redis
if (output === 'redis') {
  redisClient = redis.createClient();

  // redis connection test
  redisClient.on('connect', function() {
    console.log('Connected to redis.');
  });
}

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Length, Content-Type, Date');
  next();
}

// Init
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));

// POST
app.post('/', function handlePost(req, res) {
  var d = req.body;
  d.postId = (+new Date()).toString(36);
  d.timestamp = (new Date()).getTime();
  if(output === 'csv')
    saveCSV(d.postId+'.csv', d);
  if(output === 'redis')
    saveRedis(d);
  res.send(200);
})

// POST (error)
app.post('/error', function handlePost(req, res) {
  var d = req.body;
  console.log(d.msg);
  res.send(200);
})

var saveRedis = function saveRedis(d) {
  redisClient.hmset(d.postId, d);
  console.log('saved to redis: ' + d.postId);
}

// Process form
// TODO refactor to saveCSV (something more specific)
var saveCSV = function saveCSV(name, json) {
  var params = { 
    data: [json], 
    fields: Object.keys(json) 
  };
  json2csv(params, function(err, csvData) {
    if (err) throw err;
    csv().from(csvData).to(dataDir+name);
    console.log('csv saved, %s', name);
  })
}

if( host === 'appfog' ) {
  http.createServer(app).listen(process.env.VCAP_APP_PORT || 3000, function (err) {
    if (!err) {
      console.log('Listening on port ' + process.env.VCAP_APP_PORT || 3000);
    }
  });
}

if( host === 'local' ){
  http.createServer(app).listen(port, function (err) {
    if (!err) {
      console.log('Listening on port ' + port);
    }
  });
}

process.on('uncaughtException', function (err) {
  if (err.code === 'EACCES') {
    console.log('Unable to start server - you must start as root user.');
  }
  else {
    console.log(err);
  }
  process.exit(1);
});

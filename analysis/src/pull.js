/* global require:true, console:true, process:true, __dirname:true */
'use strict'

var fs      = require('fs')
  , dataset = []
  , redis   = require('redis')
  , client

client = redis.createClient()

client.on('connect', keys)

function keys () {
  client.keys("*", function (err, res) {
    res.forEach(data)
    client.quit()
  });
}

function data (k, i, arr) {
  client.hgetall(k, function (err, obj) {
    if(obj && obj.content)
         dataset.push(JSON.parse(obj.content)) 
    if(i === arr.length-1) log(dataset)
  });
}

function log (obj) {
  console.log(JSON.stringify(obj))
}

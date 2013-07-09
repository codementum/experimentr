var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = ['workerId', 'postId', 'primingType', 'successfulPrime', 'valenceDiff', 'cm_average', 'chart', 'time_diff_average', 'time_diff_experiment']
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)
  data = JSON.parse(data)
  data = filterUndefined(data)
  data = filterDebug(data)
//  data = filterBaddies(data)
  data = filterTime(data)
  data = filterError(data)
  convert( data )
})

function convert(d) {
  var params = {
    data: d,
    fields: fields
  }
  j2c(params, function(err, csv) {
    if (err) console.log(err)
    console.log(csv)
  })
}

function filterUndefined (arr) {
  return _.filter(arr, function(row) {
    return _.every(fields, function(f) { return row[f] })
  })
}

function filterDebug (arr) {
  return _.filter(arr, function(row) {
    return row.workerId !== 'debug'
  })
}

function filterBaddies (arr) {
var baddies = [
  'hixc8a98',
  'hixaksbn',
  'hixa8w5u',
  'A2E72ZI1VESTMR',
  'hixav7bf',
  'hixa5i8t',
  'hixap19x',
  'Link wont work!',
  'no survey'
]
  return _.filter(arr, function(row) {
    return ! _.contains(baddies, row.postId)
  })
}

function filterTime (arr) {
  return _.filter(arr, function(row) {
    var low = 328898 - 129767*2
    var high = 328898 + 129767*2
    return row.time_diff_experiment < high && row.time_diff_experiment > low
  })
}

function filterError (arr) {
  return _.filter(arr, function(row) {
    var low = 2.46 - 1.18*2
    var high = 2.46 + 1.18*2
    return row.cm_average < high && row.cm_average > low
  })
}

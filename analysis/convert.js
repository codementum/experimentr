var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = [
      'workerId',
      'postId',
      'primingType',
      'successfulPrime',
      'valenceDiff',
      'time_diff_experiment'
    ]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)

  data = JSON.parse(data)

  // filters any undefined data (it makes R scripting easier)
  data = filterUndefined(data)

  // use 'debug' for your workerId when testing experiments, 
  //   comment out if you want to analyze data from yourself
  data = filterDebug(data) 

  // an example filter
//  data = filterExperimentTime(data)

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

function filterExperimentTime (arr) {
  return _.filter(arr, function(row) {
    var low = 0
    var high = 120000
    return row.time_diff_experiment < high && row.time_diff_experiment > low
  })
}

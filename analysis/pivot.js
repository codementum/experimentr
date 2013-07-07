// node pivot.js [filename] [fieldsToSplit] [fieldsToKeep]
var j2c          = require('json2csv')
  , _            = require('underscore')
  , fs           = require('fs')
  , file         = process.argv[2]
  , fieldToKeep  = ['cm_average', 'chart']
  , fieldToSplit = ['primingType']
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)
  data = JSON.parse(data)
  data = restructure(data)
  //convert(data)
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

function restructure (arr) {
  arr = _.groupBy(arr, function(d) { return d.primingType; })
  console.log(arr);
 // return arr;
}

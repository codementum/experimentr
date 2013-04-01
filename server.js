var express   =  require('express'),
    csv       =  require('csv'),
    json2csv  =  require('json2csv'),
    fs        =  require('fs'),
    dataDir   =  'userdata/'

// Init
var app = express()
app.use(express.bodyParser())

// POST
app.post('/', function handlePost(req, res) {
  var d = req.body

  if(d.form)
    saveForm([d.type, d.userid].join('-')+'.csv', d.form)

  if(d.svg)
    saveSVG([d.type, d.userid, d.count, d.svgSource].join('-')+'.svg', d.svg)

  res.send();
})

var saveForm = function saveForm(name, json) {
  var params = { 
    data: [json], 
    fields: Object.keys(json) 
  }
  json2csv(params, function(err, csvData) {
    if (err) throw err
    csv().from(csvData).to(dataDir+name)
    console.log('csv saved, %s', name)
  })
}

var saveSVG = function saveSVG(name, svg) {
  fs.writeFile(dataDir+name, svg, function(err) {
    if (err) throw err
    console.log('svg saved, %s', name)
  })
}

// Serve static pages
app.use(express.static(__dirname + '/public'))

// LISTEN
app.listen(8001)
console.log('Listening on port 8001')

var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields = ['workerId', 'postId', 'storyVerificationResult', 'primingType', 'successfulPrime', 'valenceDiff', 'cm_average', 'chart', 'time_diff_practice', 'time_diff_total', 'time_diff_experiment', 'time_diff_average', 'time_diff_storyPrime', 
  'judgement_low', 'judgement_mediumLow', 'judgement_medium', 'judgement_mediumHigh', 'judgement_high']
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)
  data = JSON.parse(data)
  data = filterUndefined(data)
  data = filterDebug(data)
  data = filterBaddies(data)
  data = addPrimingInfo(data)
  data = addPracticeAverage(data)
  data = addErrorAverage(data)
  data = filterTaskTime(data)
  data = filterError(data)
//  data = filterPracticeTime(data)
//  data = filterVerification(data)
//  data = filterJudgementError(data)
//  data = filterJudgementErrorMAD(data)
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

function addPrimingInfo (arr) {
  fields.push('primingInfo')
  return _.map(arr, function(row) {
    row.primingInfo = row.primingType + '_' + row.successfulPrime
    return row
  })
}

function addPracticeAverage (arr) {
  fields.push('practiceAverage')
  return _.map(arr, function(row) {
    row.practiceAverage = (parseFloat(row.time_diff_total) + parseFloat(row.time_diff_practice))/6
    return row
  })
}

function addErrorAverage (arr) {
  fields.push('errorAverage')
  return _.map(arr, function(row) {
    row.errorAverage = parseFloat(row.cm_total)/5
    //with practice
    //row.errorAverage = (parseFloat(row.cm_total) + parseFloat(row.cm_practice))/6
    return row
  })
}

function filterError (arr) {
  return _.filter(arr, function(row) {
    //var low = 1
    //var high = 4
    var low = 2.96 - 1.43*3
    var high = 2.96 + 1.43*3
    return row.errorAverage < high && row.errorAverage > low
  })
}

function filterVerification (arr) {
  return _.filter(arr, function(row) {
    return row.storyVerificationResult === "true"
  })
}

function filterTaskTime (arr) {
  return _.filter(arr, function(row) {
    var low = 12839.9 - 4798.629*3
    var high = 12839.9 + 4798.629*3
    return row.practiceAverage < high && row.practiceAverage > low
  })
}

function filterPracticeTime (arr) {
  return _.filter(arr, function(row) {
    //var low = 23440 - 15140*3
    //var high = 23440 + 15140*3
    var low = 0
    var high = 50000
    return row.time_diff_practice < high && row.time_diff_practice > low
  })
}

function filterJudgementError (arr) {
  var low_mean        = 63
    , low_sd          = 32
    , mediumLow_mean  = 57
    , mediumLow_sd    = 24
    , medium_mean     = 47
    , medium_sd       = 14
    , mediumHigh_mean = 41
    , mediumHigh_sd   = 14
    , high_mean       = 31
    , high_sd         = 26
  return _.filter(arr, function(row) {
    return row.judgement_low > (low_mean - low_sd*3) && row.judgement_low < (low_mean + low_sd*3) 
    && row.judgement_mediumLow > (low_mean - low_sd*3) && row.judgement_low < (low_mean + low_sd*3) 
    && row.judgement_medium > (medium_mean - medium_sd*3) && row.judgement_medium < (medium_mean + medium_sd*3) 
    && row.judgement_mediumHigh > (mediumHigh_mean - mediumHigh_sd*3) && row.judgement_mediumHigh < (mediumHigh_mean + mediumHigh_sd*3) 
    && row.judgement_high > (high_mean - high_sd*3) && row.judgement_high < (high_mean + high_sd*3) 
  })
}

// see: Detecting outliers: Do not use standard deviations around the mean, do use the median absolute deviation around the median
function filterJudgementErrorMAD (arr) {
  var low_median        = 80
    , low_mad           = 14.826
    , mediumLow_median  = 70
    , mediumLow_mad     = 14.826
    , medium_median     = 50
    , medium_mad        = 7.413
    , mediumHigh_median = 40
    , mediumHigh_mad    = 10.3782
    , high_median       = 19
    , high_mad          = 13.3434
  return _.filter(arr, function(row) {
    return row.judgement_low > (low_median - low_mad*3) && row.judgement_low < (low_median + low_mad*3) 
    && row.judgement_mediumLow > (low_median - low_mad*3) && row.judgement_low < (low_median + low_mad*3) 
    && row.judgement_medium > (medium_median - medium_mad*3) && row.judgement_medium < (medium_median + medium_mad*3) 
    && row.judgement_mediumHigh > (mediumHigh_median - mediumHigh_mad*3) && row.judgement_mediumHigh < (mediumHigh_median + mediumHigh_mad*3) 
    && row.judgement_high > (high_median - high_mad*3) && row.judgement_high < (high_median + high_mad*3) 
  })
}

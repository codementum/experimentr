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
      'cm_average',
      'chart',
      'time_diff_practice',
      'time_diff_experiment',
      'time_diff_average'
    ]
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)
  data = JSON.parse(data)
  data = filterUndefined(data)
  data = filterDebug(data)
//  data = filterBaddies(data)
  data = addPrimingInfo(data)
//  data = addPracticeAverage(data)
  data = addSubsetAverage(data)
//  data = addErrorAverage(data)
//  data = filterError(data)
  data = filterSubsetError(data)
//  data = filterPracticeTime(data)
//  data = filterVerification(data)
//  data = filterJudgementError(data, 3)
//  data = filterJudgementErrorMAD(data)
//  data = filterTimeMAD(data)
//  data = filterTimeSD(data, 3)
//  data = filterTaskTime(data)
//  data = filterCharts(data)
//  data = filterImage(data)
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

function filterCharts (arr) {
  return _.filter(arr, function(row) {
    return row.chart !== 'nonAdjacent_5_10' && row.chart !== 'nonAdjacent_3_10'
  })
}

function filterImage (arr) {
  return _.filter(arr, function(row) {
    return ('imageComments_0' in row)
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

function getJudgementSubset (row, key, lo, hi) {
  var subset = []
    , levels = row.levelOrder.split(',')

  _.each(levels.slice(lo+1, hi+1), function(d) {
    subset.push(row[key+d])
  })

  return subset
}

function sum (arr) {
  return _.reduce(arr, function(memo, num){ 
    return parseFloat(memo) + parseFloat(num); 
  }, 0);
}

function addSubsetAverage (arr) {
  fields.push('subsetAverage')
//  fields.push('sequence')
  return _.map(arr, function(row) {
    row.subsetAverage = sum(getJudgementSubset(row, 'cm_', 0, 5)) / 4 
//    row.sequence = getJudgementSubset(row, 'cm_', 0, 20) 
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
    var low = 0
    var high = 4
//    var low = 2.96 - 1.43*3
//    var high = 2.96 + 1.43*3
    return row.cm_average < high && row.cm_average > low
  })
}

function filterSubsetError (arr) {
  return _.filter(arr, function(row) {
    var low = 0
    var high = 4.0
//    var low = 2.96 - 1.43*3
//    var high = 2.96 + 1.43*3
    return row.subsetAverage < high && row.subsetAverage > low
  })
}

function filterVerification (arr) {
  return _.filter(arr, function(row) {
    return row.storyVerificationResult === "true"
  })
}

function filterTaskTime (arr) {
  return _.filter(arr, function(row) {
    //var low = 12839.9 - 4798.629*3
    //var high = 12839.9 + 4798.629*3
    var low = 0
    var high = 45000
    return row.time_diff_average < high && row.time_diff_average > low
  })
}

function filterPracticeTime (arr) {
  return _.filter(arr, function(row) {
    //var low = 23440 - 15140*3
    //var high = 23440 + 15140*3
    var low = 0
    var high = 120000
    return row.time_diff_practice < high && row.time_diff_practice > low
  })
}

function filterJudgementError (arr, numSd) {
  var numSd           = numSd || 3
    , low_mean        = 61
    , low_sd          = 32
    , mediumLow_mean  = 57
    , mediumLow_sd    = 24
    , medium_mean     = 46
    , medium_sd       = 14
    , mediumHigh_mean = 41
    , mediumHigh_sd   = 14
    , high_mean       = 31
    , high_sd         = 26
  return _.filter(arr, function(row) {
    return row.judgement_low > (low_mean - low_sd*numSd) && row.judgement_low < (low_mean + low_sd*numSd) 
    && row.judgement_mediumLow > (low_mean - low_sd*numSd) && row.judgement_low < (low_mean + low_sd*numSd) 
    && row.judgement_medium > (medium_mean - medium_sd*numSd) && row.judgement_medium < (medium_mean + medium_sd*numSd) 
    && row.judgement_mediumHigh > (mediumHigh_mean - mediumHigh_sd*numSd) && row.judgement_mediumHigh < (mediumHigh_mean + mediumHigh_sd*numSd) 
    && row.judgement_high > (high_mean - high_sd*numSd) && row.judgement_high < (high_mean + high_sd*numSd) 
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

function filterTimeSD (arr, numSd) {
  var numSd           = numSd || 3
    , practice_mean   = 23440.74
    , practice_sd     = 15140.48
    , low_mean        = 11302.88
    , low_sd          = 5604.192
    , mediumLow_mean  = 11652.02
    , mediumLow_sd    = 8662.648
    , medium_mean     = 10569.38
    , medium_sd       = 5485.497
    , mediumHigh_mean = 10889.9
    , mediumHigh_sd   = 5430.703
    , high_mean       = 13044.65
    , high_sd         = 12053.09
  return _.filter(arr, function(row) {
    return row.time_diff_practice > (low_mean - low_sd*numSd) && row.time_diff_low < (low_mean + low_sd*numSd) 
    && row.time_diff_low > (low_mean - low_sd*numSd) && row.time_diff_low < (low_mean + low_sd*numSd) 
    && row.time_diff_mediumLow > (low_mean - low_sd*numSd) && row.time_diff_low < (low_mean + low_sd*numSd) 
    && row.time_diff_medium > (medium_mean - medium_sd*numSd) && row.time_diff_medium < (medium_mean + medium_sd*numSd) 
    && row.time_diff_mediumHigh > (mediumHigh_mean - mediumHigh_sd*numSd) && row.time_diff_mediumHigh < (mediumHigh_mean + mediumHigh_sd*numSd) 
    && row.time_diff_high > (high_mean - high_sd*numSd) && row.time_diff_high < (high_mean + high_sd*numSd) 
  })
}

function filterTimeMAD (arr) {
  var practice_median   = 19932.5
    , practice_mad      = 8488.626
    , low_median        = 10080
    , low_mad           = 3501.16
    , mediumLow_median  = 9471
    , mediumLow_mad     = 3935.562
    , medium_median     = 9312
    , medium_mad        = 3215.759
    , mediumHigh_median = 9245
    , mediumHigh_mad    = 3960.025
    , high_median       = 9902.5
    , high_mad          = 4039.344
  return _.filter(arr, function(row) {
    return row.time_diff_practice > (low_median - low_mad*3) && row.time_diff_low < (low_median + low_mad*3) 
    && row.time_diff_low > (low_median - low_mad*3) && row.time_diff_low < (low_median + low_mad*3) 
    && row.time_diff_mediumLow > (low_median - low_mad*3) && row.time_diff_low < (low_median + low_mad*3) 
    && row.time_diff_medium > (medium_median - medium_mad*3) && row.time_diff_medium < (medium_median + medium_mad*3) 
    && row.time_diff_mediumHigh > (mediumHigh_median - mediumHigh_mad*3) && row.time_diff_mediumHigh < (mediumHigh_median + mediumHigh_mad*3) 
    && row.time_diff_high > (high_median - high_mad*3) && row.time_diff_high < (high_median + high_mad*3) 
  })
}

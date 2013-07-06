experimentr = function() {
  var experimentr = {
    version: "0.0.1"
  };

  var sequence;
  var current;
  var mainDiv;
  var data = {};

  data.postId = (+new Date()).toString(36);

  experimentr.postId = function() {
    return data.postId;
  };

  experimentr.data = function() {
    return data;
  };

  experimentr.start = function() {
    init();
    current = 0;
    activate(current);
    experimentr.startTimer('experiment');
  };

  function init() {
    if(mainDiv) return;
    mainDiv = d3.select('body').append('div')
      .attr('id', 'experimentr');
    mainDiv.append('div')
      .attr('id', 'module');
    mainDiv.append('div')
      .attr('id', 'control')
      .append('button')
        .attr('type', 'button')
        .attr('id', 'next-button')
        .attr('disabled', true)
        .text('Next')
        .on('click', experimentr.next);
  }

  experimentr.next = function() {
    experimentr.showNext();
    current = current + 1;
    activate(current);
  }

  experimentr.end = function() {
    experimentr.endTimer('experiment');
  }

  experimentr.addData = function(d) {
    merge(data, d);
    experimentr.save();
  }

  experimentr.save = function(d) {
    d3.xhr('/')
      .header("Content-Type", "application/json")
      .post(JSON.stringify(data), function(err, res) {
        if(err) console.log(err);
      });
  }

  function merge(o1, o2) {
    for (var attr in o2) { o1[attr] = o2[attr]; }
  }

  experimentr.release = function() {
    d3.select('#next-button').attr('disabled', null);
  }

  experimentr.hideNext = function() {
    d3.select('#next-button').style('display', 'none');
  }

  experimentr.showNext = function() {
    d3.select('#next-button').style('display', 'inline');
  }

  experimentr.hold = function() {
    d3.select('#next-button').attr('disabled', true);
  }

  function clearModule() {
    d3.select('#module').html('');
  }

  function activate(x) {
    clearModule();
    experimentr.hold();

    if(x === sequence.length-1){
      removeNextButton();
      experimentr.end();
    }

    d3.html(sequence[x], function(err, d) {
      if(err) console.log(err);
      d3.select('#module').node().appendChild(d);
    });
  }

  function removeNextButton() {
    d3.select('#next-button').remove();
  }

  experimentr.sequence = function(x) {
    if(!arguments.length) return sequence;
    sequence = x;
    return experimentr;
  }

  experimentr.startTimer = function(x) {
    console.log('starting timer: '+x);
    data['time_start_'+x] = Date.now(); 
  }

  experimentr.endTimer = function(x) {
    console.log('ending timer: '+x);
    data['time_end_'+x] = Date.now(); 
    data['time_diff_'+x] = parseFloat(data['time_end_'+x]) - parseFloat(data['time_start_'+x]); 
    experimentr.save();
  }

  return experimentr;
}();

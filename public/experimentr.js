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
    current = current + 1;
    activate(current);
  }

  experimentr.end = function() {
    experimentr.endTimer('experiment');
  }

  // TODO break into addData and save (xhr only)
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
    data['time_start_'+x] = performance.now(); 
  }

  experimentr.endTimer = function(x) {
    console.log('ending timer: '+x);
    data['time_end_'+x] = performance.now(); 
    data['time_diff_'+x] = data['time_end_'+x] - data['time_start_'+x]; 
    experimentr.save();
  }

  return experimentr;
}();

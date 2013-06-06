experimentr = function() {
  var experimentr = {
    version: "0.0.1"
  };

  var sequence;
  var current;
  var mainDiv;
  var data = {};

  experimentr.start = function() {
    init();
    current = 0;
    activate(current);
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
    console.log('all modules complete, now load data!');
  }

  experimentr.save = function(d) {
    merge(data, d);
    d3.xhr('http://localhost:8000/')
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

  function clearModule() {
    d3.select('#module').html('');
  }

  function activate(x) {
    clearModule();

    if(x === sequence.length-1){
      removeNextButton();
      addEndButton();
    }

    d3.html(sequence[x], function(err, d) {
      if(err) console.log(err);
      d3.select('#module').node().appendChild(d);
    });
  }

  function addEndButton() {
    d3.select('#control').append('button')
      .attr('type', 'button')
      .attr('id', 'end-button')
      .text('End')
      .on('click', experimentr.end);
  }
  function removeNextButton() {
    d3.select('#next-button').remove();
  }

  experimentr.sequence = function(x) {
    if(!arguments.length) return sequence;
    sequence = x;
    return experimentr;
  }

  return experimentr;
}();

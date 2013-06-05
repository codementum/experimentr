experimentr = function() {
  var experimentr = {
    version: "0.0.1"
  };

  var sequence;
  var current;
  var mainDiv, moduleDiv, controlDiv;

  experimentr.start = function() {
    init();
    current = 0;
    activate(current);
  };

  function init() {
    if(mainDiv) return;
    mainDiv = d3.select('body').append('div')
      .attr('id', 'experimentr');
    moduleDiv = mainDiv.append('div')
      .attr('id', 'module');
    controlDiv = mainDiv.append('div')
      .attr('id', 'control');
    controlDiv.append('button')
      .attr('type', 'button')
      .attr('id', 'next-button')
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

  function clearModule() {
    d3.select('#module').html('');
  }

  function activate(x) {
    clearModule();

   if(x === sequence.length-1){
     console.log('at the final module');
     d3.select('#next-button').remove();
     d3.select('#control').append('button')
       .attr('type', 'button')
       .attr('id', 'end-button')
       .text('End')
       .on('click', experimentr.end);
   }

   d3.html(sequence[x], function(err, d) {
     if(err) console.log(err);
     d3.select('#module').node().appendChild(d);
   });
  }

  experimentr.sequence = function(x) {
    if(!arguments.length) return sequence;
    sequence = x;
    return experimentr;
  }

  return experimentr;
}();

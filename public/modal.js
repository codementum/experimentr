(function() {
  var protocol = document.location.protocol
    , userid = stuccoId;
  
  var host  = '//localhost/';
//  var host  = '//stucco.aws.af.cm/';

  // load picoModal before launching the modal form
  loadScript(protocol+host+'components/PicoModal/picoModal.min.js', modalForm);
   
  function modalForm(source) {
    // Load cleanslate and the form's css
    loadCSS(protocol+host+'components/cleanslate/cleanslate.min.css');
    loadCSS(protocol+host+'forms/form.css');

    // load form html
    var req = new XMLHttpRequest();
    req.open('GET', protocol+host+'forms/stucco.html', false);
    req.send();
  
    // launches a modal dialog with the form
    var modal = picoModal({
      content: req.responseText,   
      closeButton: false,
      shadowClose: false
    }); 
  
    // watch for click events on form
    document.getElementById('stuccoSubmit').addEventListener(
      'click', postData, false
    );
  
    // submit the data using XMLHttpRequest()
    function postData(e) {
      e.preventDefault();
  
      var data = {
        url:          document.URL,
        date:         new Date(),
        relevance:    getRadioSelection('relevance'),
        importance:   getRadioSelection('importance'),
        credibility:  getRadioSelection('credibility'),
        userid:       userid
      };

      var post = postJSON(protocol+host+'', JSON.stringify(data));
      post.addEventListener('load', function() {
        console.log('successful POST');
      }, false);
      post.addEventListener('error', function() {
        postJSON(protocol+host+'error', JSON.stringify({msg: "error on POST"}));
      }, false);
  
      modal.close();
    }
  }

  function postJSON(loc, data) {
    var req = new XMLHttpRequest();
    req.open('POST', loc, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(data);
    return req;
  }
  
  function getRadioSelection(radioName) {
    var radios = document.getElementsByName(radioName);
    var value;
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].type === 'radio' && radios[i].checked) {
        value = radios[i].value;       
      }
    }
    return value;
  }
  
  function idGenerator(idLength)
  {
  	var id = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( var i=0; i < idLength; i++ ) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

  // from http://stackoverflow.com/a/950146
  function loadScript(url, callback) {
    // adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
  
    // then bind the event to the callback function 
    // there are several events for cross browser compatibility
    script.onreadystatechange = callback;
    script.onload = callback;
  
    head.appendChild(script);
  }

  function loadCSS(file) {
    var head = document.getElementsByTagName('head')[0];
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.href = file;
    head.appendChild(css);
  }

})();

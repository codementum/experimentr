var modalForm = function(source) {
  // load source html
  var sourceRequest = new XMLHttpRequest();
  sourceRequest.open('GET', source, false);
  sourceRequest.send();
  
  // launches a modal dialog with the form
  var modal = picoModal({
    content: sourceRequest.responseText,   
    closeButton: false,
    shadowClose: false
  }); 

  // find the just-created form
  var form = d3.select(modal.modalElem).select('form');

  // submit the data using d3.xhr
  form.on('submit', function(){
    d3.event.preventDefault();

    var data = {
      "form": form2js(form.node()),
      "userid": userid,
      "type": 'form'
    }; 

    var xhr = d3.xhr('/')
      .header('Content-type', 'application/json')
      .post(JSON.stringify(data));

    xhr.on('load', function (res) {
      console.log('successful POST of '+data.type);
    })
    .on('error', function (res) {
      console.log('failed POST of '+data.type);
    })

    modal.close();
  });
}

//  // on form submit, post and close modal
//  $(form).submit(function() {
//    var data = {}; 
//    data.form = $(this).serializeObject();
//    data.visPrimUserID = visPrimUserID;
//    data.form.visPrimUserID = visPrimUserID;
//    data.type = $(form).attr('id'); 
//    $.post('/', data, function(){ console.log('POST of %s successful', data.type); });
//    modal.close();
//    return false;
//  });

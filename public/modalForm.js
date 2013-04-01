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
  var form = $(modal.modalElem).find('form');

  // on form submit, post and close modal
  $(form).submit(function() {
    var data = {}; 
    data.form = $(this).serializeObject();
    data.visPrimUserID = visPrimUserID;
    data.form.visPrimUserID = visPrimUserID;
    data.type = $(form).attr('id'); 
    $.post('/', data, function(){ console.log('POST of %s successful', data.type); });
    modal.close();
    return false;
  });
}

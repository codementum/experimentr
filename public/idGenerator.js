function idGenerator(idLength)
{
	var id = "";
  var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for( var i=0; i < idLength; i++ )
  {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return id;
}

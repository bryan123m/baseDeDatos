//inicializar Firebase

var config = {
    apiKey: "AIzaSyDhTqG9TSBB6xJTEq35gj3PST7Y4xrFQgU",
    authDomain: "chat-2d6e1.firebaseapp.com",
    databaseURL: "https://chat-2d6e1.firebaseio.com",
    projectId: "chat-2d6e1",
    storageBucket: "",
    messagingSenderId: "627360866822"
  };
  firebase.initializeApp(config);

  const database = firebase.database();
  
  $('button').click(function( event ) {
    event.preventDefault();
    console.log( $('#mensaje').val() );
    var mensaje = $('#mensaje').val();

    var data = { usuario: 'Bryan', mensaje: mensaje };
    database.ref('chat/').push(data, function(error) {
      if (error) { throw error;}
      else { 
        console.info( 'guardamos la informacion');
        ponerMensaje(data);
        $('#mensaje').val('')
       }
    });
  } );

  function ponerMensaje( pepito ) {
    $('#caja').append( '<p>' +pepito.usuario+ ':' +pepito.mensaje+ '<p>' );
  }

  function iterar (data){
    for ( var chiguiro in data ) {
      if ( data.hasOwnProperty( chiguiro ) ) {
        var element = data[chiguiro];
        var gato = {usuario: element.usuario, 
          mensaje: element.mensaje
        };
        ponerMensaje(gato);
      }
    }
  }

  var traerMensajes = new Promise(function(res, rej) {
    var mensajes = database.ref('/chat/').once('value').then(function(snapshot){
      return res( snapshot.val() );  
  });
    if (!mensajes) { return rej();};
});

traerMensajes.then(function(data) {
    iterar(data);
});
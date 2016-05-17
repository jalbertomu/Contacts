/**
 * Created by Albert on 06/05/2016.
 */
app.factory('Usuario', function($resource){
  return $resource('http://localhost:8080/usuario/login/:email/:contrasena',{email:'@email',contrasena:'@contrasena'},{
    get:    {method: 'GET', isArray: false},})
});
app.factory('NewUser', function($resource){
  return $resource('http://localhost:8080/usuario')
});


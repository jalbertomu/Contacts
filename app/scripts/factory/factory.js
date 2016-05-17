app.factory('provincia', function($http) {
  return $http.get('http://localhost:8080/provincia');
});
app.factory('ciudad', function($resource){
    return $resource('http://localhost:8080/provincia/:id', {id:'@id'},{
    get:    {method: 'GET', isArray: true}})
});

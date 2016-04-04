app.factory('myService', function() {
  var savedData = [];
  function set(data) {
    savedData = data;
  }
  function get() {
    return savedData;
  }
  return {
    set: set,
    get: get
  }
});

app.factory('getEmployeeService', function($http, $q){
  return {
    getAll: getAll
  }
  function getAll () {
    var defered = $q.defer();
    var promise = defered.promise;

    $http.get("http://localhost:8080/employee")
      .success(function(data) {
        defered.resolve(data);
      })
      .error(function(err) {
        defered.reject(err)
      });

    return promise;
  }
});

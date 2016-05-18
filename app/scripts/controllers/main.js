'use strict';
var app = angular.module('myapp',['ngRoute', 'LocalStorageModule', 'ngMaterial','ngResource', 'material.svgAssetsCache']);
app.config(function($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl : 'views/login.html'
    })
    .when('/employee', {
      templateUrl : 'views/employees.html'
    })
  .when('/register', {
      templateUrl: 'views/register.html'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html'
    })
});

app.controller('main', function ($scope, $location, localStorageService) {
  $scope.currentPath = $location.path();
  $scope.pruebas = localStorageService.get('usuarioCookie');
    });
app.controller('login', function ($scope, Usuario, $filter, $location, localStorageService, $route) {
  $scope.look = function () {
    if ($scope.loginForm.$valid) {
        var usuario = getFormPost($scope, $filter);
      Usuario.get({email : usuario.email},{contrasena : usuario.contrasena} ).$promise.then(function(data) {
        $scope.usuario = data;
        if($scope.usuario.id != null){
          $scope.usuario.isLogged = true;
          localStorageService.set('usuarioCookie',$scope.usuario);
          $location.path('/profile');
          location.reload();
        }
  })
}}});
app.controller('DemoCtrl',function(provincia, $scope, ciudad, $filter, NewUser, $location, localStorageService, $route) {
$scope.usuarioRegister={
    nombre:"", email:"", provincia:"", contrasena:"", repite:"", ciudad:""};
  provincia.success(function(data) {
    $scope.provincias = data;
    $scope.provincias.map(function(provincia){
      $scope.updateProvincia = function() {
        var identificador = $scope.usuarioRegister.provincia.id;
         ciudad.get({id : identificador}).$promise.then(function(data) {
           $scope.ciudades = data;
           $scope.updateCiudad = function(ciudades){
           }
        });
      }});
  });

  $scope.create = function () {
    var usuario = getRegisterForm($scope, $filter);
    $scope.usuario = NewUser.save(usuario);
    $scope.usuario.isLogged = true;
    localStorageService.set('usuarioCookie',$scope.usuario);
    console.log($scope.usuario);
    $location.path('/profile');
  }
});
app.controller('AppCtrl', function($scope, localStorageService){
  $scope.usuario = localStorageService.get('usuarioCookie');
});
function getRegisterForm($scope){
  var ciudad =$scope.usuarioRegister.ciudad.id;
  var usuario = {
    nombre : $scope.usuarioRegister.nombre,
    email: $scope.usuarioRegister.email,
    contrasena : $scope.usuarioRegister.contrasena,
    ciudadId : ciudad
  }
  return usuario;
}
function getFormPost($scope){
  var usuario = {
    email: $scope.usuarioLogin.email,
    contrasena: $scope.usuarioLogin.contrasena
  };
  return usuario;
}
(function () {
  'use strict';
  angular
    .module('main',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($timeout, $q, $log) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
        deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  }
})();

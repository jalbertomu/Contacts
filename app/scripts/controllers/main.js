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

app.controller('main', function ($scope, $location) {
  $scope.currentPath = $location.path();
  console.log($location.path());
    });
app.controller('login', function ($scope, Usuario, $filter, $location, localStorageService) {
  $scope.look = function () {
    if ($scope.loginForm.$valid) {
        var usuario = getFormPost($scope, $filter);
      Usuario.get({email : usuario.email},{contrasena : usuario.contrasena} ).$promise.then(function(data) {
        $scope.usuario = data;
        if($scope.usuario.id != null){
          //$location.path('/profile/').search({id: $scope.usuario.id});
          localStorageService.set('usuarioCookie',$scope.usuario);
          $location.path('/profile');
        }
  })
}}});
//  }
//});
  //app.controller('usuariosController', function ($scope, getEmployeeService, localStorageService) {
  //  $scope.$item = localStorageService.get('localStorageKey');
  //});
app.controller('DemoCtrl',function(provincia, $scope, ciudad, $filter, NewUser) {
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
    NewUser.save(usuario);
    console.log(usuario)
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
    ciudad : ciudad
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



'use strict';
var app = angular.module('myapp',['ngRoute', 'LocalStorageModule', 'ngMaterial']);
app.config(function($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl : 'views/login.html'
    })
    .when('/', {
      templateUrl : 'views/profile.html'
    })
    .when('/employee', {
      templateUrl : 'views/employees.html'
    });
});

app.controller('main', function ($scope) {
  $scope.show = true;
  $scope.navigation = function () {
    if ($scope.show) {
      $scope.show = false;
    } else {
      $scope.show = true;
    }
  }
});

  app.controller('usuariosController', function ($scope, getEmployeeService, localStorageService) {
    $scope.$item = localStorageService.get('localStorageKey');
  });
app.controller('AppCtrl', function($scope, getEmployeeService, $http){
    $scope.imagePath;
  $http.get("http://localhost:8080/employee").then(function (response) {
    $scope.employees = response.data;
  });
});

  app.controller('tablaController', function ($scope, $http,  getEmployeeService, $filter) {
    $scope.$emit('searching');
    $http.get("http://localhost:8080/employee").then(function (response) {
      $scope.employees = response.data;
      $scope.saveAlumno = function () {
        if ($scope.alumnoForm.$valid) {
          var employee = getFormPost($scope, $filter);
          $http({
            url: 'http://localhost:8080/employee',
            dataType: 'json',
            method: 'POST',
            data: employee,
            headers: {
              "Content-Type": "application/json"
            }
          }).success(function (response) {
            $scope.response = response;
          }).error(function (error) {
            $scope.error = error;
          });
          $scope.employees.push(employee);
          vaciaForm($scope);
        }
      };
      $scope.selectedRow = null;
      $scope.setClickedRow = function (index, employee) {
        if ($scope.selectedRow == index) {
          $scope.selectedRow = null;
          vaciaForm($scope);
        } else {
          $scope.selectedRow = index;
          $scope.selectedStock = function (row) {
            $scope.selectedRow = row;
          };
          $scope.employee = $scope.employees[index];
          $scope.employeeData = {
            name: $scope.employee.name, primerApellido: $scope.employee.primerApellido,
            segundoApellido: $scope.employee.segundoApellido, curso: $scope.employee.curso
          };
          $scope.removeRow = function () {
            if ($scope.selectedRow != null) {
              $http({
                url: 'http://localhost:8080/employee',
                dataType: 'json',
                method: 'DELETE',
                data: $scope.employee,
                headers: {
                  "Content-Type": "application/json"
                }
              }).success(function (response) {
                $scope.response = response;
              }).error(function (error) {
                $scope.error = error;
              });
            }
            $scope.employees.splice($scope.selectedRow, 1);
            vaciaForm($scope);
            $scope.selectedRow = null;
          };
          $scope.updateRow = function () {
            $http.put(url,getFormModify($scope)).success(function (data, status) {
              $scope.employeeModified = response.employee;
            });
            window.location.reload(true);
          };
        }
      }
    });
  });

function vaciaForm($scope){
  $scope.employeeData = {
    name: "", primerApellido: "",
    segundoApellido: "", curso: ""
  };
};

  function getFormModify($scope){
    var employeeModified ={
      name: $scope.employeeData.name, primerApellido: $scope.employeeData.primerApellido,
      segundoApellido: $scope.employeeData.segundoApellido, curso: $scope.employeeData.curso,
      id: $scope.employee.id
    };
    return employeeModified;
  }
  function getFormPost($scope){
    $scope.date = new Date();
    var employee = {
      name: $scope.employeeData.name, primerApellido: $scope.employeeData.primerApellido,
      segundoApellido: $scope.employeeData.segundoApellido, curso: $scope.employeeData.curso
    };
    return employee;
  }

app.controller('DemoCtrl', function DemoCtrl ($timeout, $q, $scope, $log, $http) {
  var self = this;

  self.simulateQuery = false;
  self.isDisabled    = false;

  self.querySearch   = querySearch;

  function querySearch (query) {
    return $http.get("http://localhost:8080/employee")
      .then(function(result){
        return result.data;
      })
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(item) {
      return (item.value.indexOf(lowercaseQuery) === 0);
    };

  }
});



app.directive('displayTable', function(){
  return{
    restrict: 'E',
    templateUrl: 'views/tabla.html',
    replace: true
  }
});
app.directive('aAuto', function(){
  return{
    restrict: 'E',
    templateUrl: "views/autocomplete.html",
    replace:true
  }
});

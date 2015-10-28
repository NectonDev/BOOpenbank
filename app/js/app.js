'use strict';

// Declare app level module which depends on views, and components
angular.module('BOOpenbank', [
  'ngRoute',
  'ngMaterial',
  'ngStorage',
  'ngAnimate',
  'APIConfig',
  'ez.datetime',
  'ez.modal',
  'ez.dropdown',
  'ez.transition',
  'headerDirective',
  'tocHeaderDirective',
  'tocBodyDirective',
  'tocFooterDirective',
  'searchDirective',
  'tocDirective',
  'expDetailDirective',
  'expDetailHeaderDirective',
  'expDetailBodyDirective',
  'userDetailDirective',
  'ExpedientesService',
  'TipoDocsService',
  'EstadosService',
  'RequisitosService',
  'UsersService'
])
.config(['$routeProvider', function($routeProvider ) {
  $routeProvider
    .when('/backoffice', {
      templateUrl : 'templates/backoffice.html',
    })
    .when('/backoffice/:expId', {
      templateUrl : 'templates/expDetail.html',
    })
    .when('/backoffice/:expId/:userId', {
      templateUrl : 'templates/userDetail.html',
    })
    .when('/contactcenter', {
      templateUrl : 'templates/contactcenter.html',
    })
    .when('/buscador', {
      templateUrl : 'templates/search.html',
    })
    .otherwise({redirectTo: '/backoffice'});
}])
    .run(['$http', '$localStorage', 'APIConfigService' ,function($http, $localStorage, APIConfigService){
      (function($http){
        var headers_object = APIConfigService.getHeaders();
        var allEstados  = $http.get(
            APIConfigService.getUrlListaEstados(),
            headers_object
        );
        var allDocs  = $http.get(
            APIConfigService.getUrlListaDocs(),
            headers_object
        );
        allEstados.then(function(data){
          $localStorage.tiposEstados = data.data;
        }, function(data){
          console.log("Error recuperando los estados: "+data);
        });
        allDocs.then(function(data){
          $localStorage.tiposDocs = data.data;
        }, function(data){
          console.log("Error recuperando los tipos de documento: "+data);
        });
      })($http);
    }]);

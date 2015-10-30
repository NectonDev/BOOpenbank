'use strict';

angular.module('BOOpenbank', [
  'ngRoute',
  'ngMaterial',
  'ngStorage',
  'ngAnimate',
  'ngDialog',
  'naif.base64',
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
  'infoReqUserDirective',
  'ExpedientesService',
  'TipoDocsService',
  'EstadosService',
  'RequisitosService',
  'UsersService'
])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/backoffice', {
      templateUrl : 'templates/backoffice.html'
    })
    .when('/backoffice/:expId', {
      templateUrl : 'templates/expDetail.html'
    })
    .when('/backoffice/:expId/:userId', {
      templateUrl : 'templates/userDetail.html'
    })
    .when('/contactcenter', {
      templateUrl : 'templates/contactcenter.html'
    })
    .when('/buscador', {
      templateUrl : 'templates/search.html'
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
    var allPaises  = $http.post(
        APIConfigService.getUrlListaPaises(),
        headers_object
    );
    allEstados.then(function(data){
      $localStorage.tiposEstados = data.data;
    }).catch(function(data){
      console.log("Error recuperando los estados: " + data);
    });
    allDocs.then(function(data){
      $localStorage.tiposDocs = data.data;
    }).catch(function(data){
      console.log("Error recuperando los tipos de documento: " + data);
    });
    allPaises.then(function(data){
      $localStorage.listaPaises = data.data.data.paises;
    }).catch(function(data){
      console.log("Error recuperando el listado de paises: " + data);
    });
    $localStorage.tiposPreFiltros = {
      pteValidacion : 'pendienteValidacion',
      pteDocumentacion : 'pendienteDocumentacion',
      fioc : 'fioc',
      pteActivacion : 'pendienteActivacion',
      pteCancelacion : 'pendienteCancelacion'
    };
    $localStorage.accountInfo = {
      IBAN : 'ES89',
      Entidad : '2229',
      Oficina : '9598'
    }
  })($http);
}]);

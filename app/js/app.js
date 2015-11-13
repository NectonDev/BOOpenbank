'use strict';

angular.module('BOOpenbank', [
  'ngRoute',
  'ngMaterial',
  'ngStorage',
  'ngAnimate',
  'ngDialog',
  'naif.base64',
  'APIConfig',
  'LiteralsConfig',
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
  'observacionesDirective',
  'loginDirective',
  'mpdcDirective',
  'ExpedientesModel',
  'TipoDocsModel',
  'EstadosModel',
  'RequisitosModel',
  'ObservacionesModel',
  'UsersModel',
  'ListService',
  'ExpedientesService',
  'ObservacionesService',
  'LoginService'
])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl : 'templates/login.html'
    })
    .when('/backoffice', {
      templateUrl : 'templates/backoffice.html'
    })
    .when('/backoffice/:expId', {
      templateUrl : 'templates/expDetail.html'
    })
    .when('/backoffice/:expId/:userId', {
      templateUrl : 'templates/userDetail.html'
    })
    .when('/backoffice/:expId/:userId/cuestionario', {
      templateUrl : 'templates/cuestionario.html'
    })
    .when('/backoffice/:expId/:userId/mpdc', {
      templateUrl : 'templates/mpdc.html'
    })
    .when('/observaciones/:expId', {
      templateUrl : 'templates/observaciones.html'
    })
    .when('/contactcenter', {
      templateUrl : 'templates/contactcenter.html'
    })
    .when('/buscador', {
      templateUrl : 'templates/search.html'
    })
    .otherwise({redirectTo: '/backoffice'});
}])
.run(['ListService' ,function(ListService){
  (function(){
    ListService.getListEstados();
    ListService.getListReq();
    ListService.getListEstadosReq();
    ListService.getListRechazosReq();
    ListService.getListMotivosCancelacion();
    ListService.getListTipoDocs();
    ListService.getListPaises();
    ListService.getListCiudades();
    ListService.getListTipoVias();
    ListService.getListPrefiltros();
    ListService.getListAccount();
  })();
}]);


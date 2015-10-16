'use strict';

// Declare app level module which depends on views, and components
angular.module('BOOpenbank', [
  'ngRoute',
  'ngMaterial',
  'APIConfig',
  'headerDirective',
  'tocHeaderDirective',
  'tocBodyDirective',
  'tocFooterDirective',
  'searchDirective',
  'tocDirective',
  'ExpedientesService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/backoffice', {
      templateUrl : 'templates/backoffice.html',
    })
    .when('/contactcenter', {
      templateUrl : 'templates/contactcenter.html',
    })
    .when('/buscador', {
      templateUrl : 'templates/search.html',
    })
    .otherwise({redirectTo: '/backoffice'});
}]);

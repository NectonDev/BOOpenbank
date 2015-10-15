'use strict';

angular.module('searchDirective', [])
    .controller('SearchController', ['$scope', function($scope) {
        $scope.searchInfo = {
            IBANText: 'IBAN',
            IBANNumber: 'ES89',
            EntidadText: 'Entidad',
            EntidadNumber: '2229',
            OficinaText: 'Oficina',
            OficinaNumber: '9598',
            DCText: 'DC',
            DCNumber: '95'
        };
        $scope.typeOptions = {
            choices: ['Tipo 1', 'Tipo 2', 'Tipo 3']
        };
        $scope.statesOptions = {
            choices: ['En Proceso', 'Cancelado']
        };
        $scope.canalesOptions = {
            choices: ['Movil', 'Ordenador']
        };
    }])
    .directive('search', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/search/templates/search.html'
        };
    });
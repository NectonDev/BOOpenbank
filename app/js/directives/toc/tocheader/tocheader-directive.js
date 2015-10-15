'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$scope', function($scope) {
        $scope.tocheaderInfo = {
            pteValidar: 'PTE. VALIDAR',
            pteCancelar: 'PTE. CANCELAR',
            pteFIOC: 'PTE. FIOC',
            activados: 'ACTIVADOS'
        };
    }])
    .directive('tocHeader', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocheader/templates/tocheader.html'
        };
    });
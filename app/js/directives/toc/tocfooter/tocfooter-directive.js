'use strict';

angular.module('tocFooterDirective', [])
    .controller('TocFooterController', ['$scope', 'ExpedientesModel', function($scope) {
        $scope.tocfooterInfo = {
            numResultsPerPageOptions: [5,10,15,20]
        };
        $scope.defaultResultsPerPage = $scope.tocfooterInfo.numResultsPerPageOptions[0];
    }])
    .directive('tocFooter', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocfooter/templates/tocfooter.html',
            replace: true
        };
    });
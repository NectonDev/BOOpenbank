'use strict';

angular.module('tocFooterDirective', [])
    .controller('TocFooterController', ['$scope', 'ExpedientesModel', function($scope, ExpedientesModel) {
        $scope.numResultsPerPageOptions = [5,10,15,20];

        $scope.numResultsPerPageDefault = $scope.numResultsPerPageOptions[0];

        $scope.$watch('numActualResultsPerPage',function(data){
            var arrayOfPages = [];
            var numTotalPages = parseInt($scope.numTotalExpedientes/data);
            for (var i=0;i<numTotalPages;i++){
                arrayOfPages.push(i+1);
            }
            $scope.numTotalPages = arrayOfPages;
        })

        $scope.$watch('tableResults',function(data){

        })

    }])
    .directive('tocFooter', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocfooter/templates/tocfooter.html',
            replace: true,
            scope: {
                resultsPerPageOptions : "=",
                defaultResultsPerPage : "=",
                actualSizePerPage : "=",
                numTotalExpedientes : "="
            }
        };
    });
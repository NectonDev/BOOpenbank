'use strict';

angular.module('tocFooterDirective', [])
    .controller('TocFooterController', ['$rootScope', '$scope', 'ExpedientesModel', function($rootScope, $scope, ExpedientesModel) {

        $scope.numResultsPerPageOptions = [5,10,15,20];

        $scope.numResultsPerPageDefault = $scope.numResultsPerPageOptions[0];

        $scope.goToPage = function(page){
            if (page){
                $rootScope.$broadcast('pageChange', page);
            }
        };

        $scope.$watch('tableResults', function(tableResults){
            if (tableResults){
                $scope.numTotalPages = ExpedientesModel.makePagination(tableResults);
            }
        });

        $scope.$watch('numActualResultsPerPage',function(data){
            if (data){
                $scope.numPageResults = data;
                $rootScope.$broadcast('pageSizeChange', data);
            }
        });
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
                numTotalPages : "=",
                goToPage : "="
            }
        };
    });
'use strict';

angular.module('tocFooterDirective', [])
    .controller('TocFooterController', ['$scope', 'ExpedientesModel', function($scope, ExpedientesModel) {
        $scope.numResultsPerPageOptions = [5,10,15,20];

        $scope.numResultsPerPageDefault = $scope.numResultsPerPageOptions[0];

        $scope.$watch('numActualResultsPerPage',function(data){
            if (data) {
                $scope.numPageResults = data;
                $scope.$watch('tableResults', function(tableResults){
                    if (tableResults){
                        var arrayOfPages = [];
                        var numExpedientes = tableResults.numResults;
                        var arrayNumPages = (numExpedientes / $scope.numPageResults).toString().split(".");
                        if (arrayNumPages[0]==0){
                            arrayOfPages.push(1);
                        }else{
                            for (var i = 0; i < arrayNumPages[0]; i++) {
                                arrayOfPages.push(i + 1);
                            }
                            if (arrayNumPages[1] > 0){
                                arrayOfPages.push(arrayOfPages.length+1);
                            }
                        }
                        $scope.numTotalPages = arrayOfPages;
                    }
                })

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
                numTotalPages : "="
            }
        };
    });
'use strict';

angular.module('tocFooterDirective', [])
    .controller('TocFooterController', ['$rootScope', '$scope', 'ExpedientesModel', function($rootScope, $scope, ExpedientesModel) {
        $scope.actualPage = parseInt(ExpedientesModel.getPage());

        $scope.numResultsPerPageOptions = [5,10,15,20];

        $scope.numResultsPerPageDefault = $scope.numResultsPerPageOptions[0];

        $scope.goToPage = function(page){
            if (page){
                $scope.actualPage = page;
                $rootScope.$broadcast('pageChange', page);
            }
        };

        $scope.goToPrevPage = function(){
            var pageActual = ExpedientesModel.getPage();
            if (pageActual>1){
                $scope.actualPage = parseInt(pageActual)-1;
                $rootScope.$broadcast('pageChange', parseInt(pageActual)-1);
            }

        };

        $scope.goToNextPage = function(){
            var pageActual = ExpedientesModel.getPage();
            $scope.actualPage = parseInt(pageActual)+1;
            $rootScope.$broadcast('pageChange', parseInt(pageActual)+1);
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

        $scope.isFioc = function(){
            return ExpedientesModel.isFioc();
        };
    }])
    .directive('tocFooter', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocfooter/templates/tocfooter.html',
            replace: true,
            scope: {
                actualPage: "=",
                resultsPerPageOptions: "=",
                defaultResultsPerPage: "=",
                actualSizePerPage: "=",
                numTotalPages: "=",
                goToPage: "=",
                goToPrevPage: "=",
                goToNextPage: "=",
                isFioc: "="
            }
        };
    });
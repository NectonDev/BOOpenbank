'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$rootScope','$scope', function($rootScope, $scope) {
        $scope.buttons = [
            ['PTE. VALIDAR','pendienteActivacion'],
            ['PTE. DOCUMENTACI\u00F3N','pendienteDocumentacion'],
            ['REVISI\u00F3N FIOC','fioc'],
            ['PTE. ACTIVACI\u00F3N','pendienteActivacion'],
            ['PTE. CANCELACI\u00F3N','pendienteCancelacion']
        ];
        $scope.changeFilter = function(filter){
            if (filter) {
                $scope.filterActive = filter;
                $scope.tableResults = "";
                $rootScope.$broadcast('filterActive',filter);
            }
        };
    }])
    .directive('tocHeader', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocheader/templates/tocheader.html',
            replace: true,
            scope: {
                headerInfo: "=",
                changeFilter: "=",
                filterActive: "="
            }
        };
    });
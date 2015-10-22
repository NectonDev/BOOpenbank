'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$rootScope','$scope', function($rootScope, $scope) {
        $scope.buttons = [
            ['PTE. VALIDAR','pendienteActivacion'],
            ['PTE. DOCUMENTACI\u00D3N','pendienteDocumentacion'],
            ['REVISI\u00D3N FIOC','fioc'],
            ['PTE. ACTIVACI\u00D3N','pendienteActivacion'],
            ['PTE. CANCELACI\u00D3N','pendienteCancelacion']
        ];
        $scope.changeFilter = function(filter){
            if (filter) {
                $rootScope.$broadcast('filterChange',filter);
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
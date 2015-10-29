'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$rootScope','$scope', '$localStorage', function($rootScope, $scope, $localStorage) {
        var tiposPreFiltros = $localStorage.tiposPreFiltros;

        $scope.buttons = [
            ['PTE. VALIDAR',tiposPreFiltros.pteValidacion],
            ['PTE. DOCUMENTACI\u00D3N',tiposPreFiltros.pteDocumentacion],
            ['REVISI\u00D3N FIOC',tiposPreFiltros.fioc],
            ['PTE. ACTIVACI\u00D3N',tiposPreFiltros.pteActivacion],
            ['PTE. CANCELACI\u00D3N',tiposPreFiltros.pteCancelacion]
        ];
    }])
    .directive('tocHeader', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocheader/templates/tocheader.html',
            replace: true,
            scope: {
                headerInfo: "=",
                changeFilter: "=",
                filterActive: "="
            },
            link: function($scope){
                $scope.changeFilter = function(filter){
                    if (filter) {
                        $rootScope.$broadcast('filterChange',filter);
                    }
                };
            }
        };
    }]);
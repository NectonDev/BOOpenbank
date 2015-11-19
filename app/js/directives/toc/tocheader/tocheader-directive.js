'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$rootScope','$scope', '$localStorage', 'LiteralsConfigService', function($rootScope, $scope, $localStorage, LiteralsConfigService) {
        var tiposPreFiltros = $localStorage.tiposPreFiltros;
        var tocHeaderLiterals = LiteralsConfigService.getTocHeaderLiterlas();

        $scope.buttons = [
            [tocHeaderLiterals.pteValidar,tiposPreFiltros.pteValidacion],
            [tocHeaderLiterals.pteDoc,tiposPreFiltros.pteDocumentacion],
            [tocHeaderLiterals.pteRevision,tiposPreFiltros.fioc],
            [tocHeaderLiterals.pteActivacion,tiposPreFiltros.pteActivacion],
            [tocHeaderLiterals.pteCancelacion,tiposPreFiltros.pteCancelacion],
            [tocHeaderLiterals.pteBloqueo,tiposPreFiltros.pteBloqueo]
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
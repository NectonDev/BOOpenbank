'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$rootScope','$scope', '$localStorage', 'LiteralsConfigService', 'TipoAppService', function($rootScope, $scope, $localStorage, LiteralsConfigService, TipoAppService) {
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

        $scope.tipoApp = TipoAppService.tipoApp();
    }])
    .directive('tocHeader', ['$rootScope', 'ExpedientesModel', function($rootScope, ExpedientesModel) {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/tocheader/templates/tocheader.html',
            replace: true,
            scope: {
                headerInfo: "=",
                changeFilter: "=",
                filterActive: "=",
                tipoApp: "="
            },
            link: function($scope){
                $scope.filterActive = ExpedientesModel.getFilter();
                $scope.changeFilter = function(filter){
                    if (filter) {
                        $scope.filterActive = filter;
                        $rootScope.$broadcast('filterChange',filter);
                    }
                };
            }
        };
    }]);
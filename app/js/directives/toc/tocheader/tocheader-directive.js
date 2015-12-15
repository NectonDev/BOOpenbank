'use strict';

angular.module('tocHeaderDirective', [])
    .controller('TocHeaderController', ['$rootScope', '$scope', '$localStorage', 'LiteralsConfigService', 'TipoAppService', function($rootScope, $scope, $localStorage, LiteralsConfigService, TipoAppService) {
        var tiposPreFiltros = $localStorage.tiposPreFiltros;
        var tocHeaderLiterals = LiteralsConfigService.getTocHeaderLiterlas();

        $scope.buttonsBO = [
            [tocHeaderLiterals.pteValidar,tiposPreFiltros.pteValidacion],
            [tocHeaderLiterals.pteDoc,tiposPreFiltros.pteDocumentacion],
            [tocHeaderLiterals.pteRevision,tiposPreFiltros.fioc],
            [tocHeaderLiterals.pteActivacion,tiposPreFiltros.pteActivacion],
            [tocHeaderLiterals.pteCancelacion,tiposPreFiltros.pteCancelacion],
            [tocHeaderLiterals.pteBloqueo,tiposPreFiltros.pteBloqueo]
        ];

        $scope.buttonsCC = [
            [tocHeaderLiterals.lstIncidencias,tiposPreFiltros.incidencia],
            [tocHeaderLiterals.avisos,tiposPreFiltros.avisos],
        ];

        $scope.tipoApp = TipoAppService.tipoApp();

        $scope.changeFilter = function(filter){
            if (filter) {
                $scope.filterActive = filter;
                $rootScope.$broadcast('filterChange',filter);
            }
        };
        $scope.getAvisos = function(filter){
            if (angular.isDefined(filter) && angular.equals(filter,tiposPreFiltros.incidencia)) {
                $scope.filterActive = filter;
                $rootScope.$broadcast('filterChange',filter);
            }else{
                if (angular.equals(filter,tiposPreFiltros.avisos)){
                    $scope.filterActive = filter;
                    $rootScope.$broadcast('avisos',filter);
                }
            }
        };
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
            }
        };
    }]);
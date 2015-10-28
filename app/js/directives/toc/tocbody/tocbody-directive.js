'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', 'ExpedientesModel', function($scope, ExpedientesModel) {
        ExpedientesModel.setDefaultParameters();

        $scope.tocbodyInfo = {
            numCuenta: 'N\u00FAmero cuenta',
            canal: 'Canal',
            interv: 'Interv.',
            gestor: 'Gestor',
            creationDate: 'Fecha Creaci\u00F3n',
            modDate: 'Fecha Modificaci\u00F3n',
            nombre: 'Nombre',
            apellidos: 'Apellidos',
            empresa: 'Empresa',
            actividad: 'Actividad'
        };

        $scope.tableResults = {};

        $scope.$watch('hideLocked',function(data){
            if (data){
                $scope.tableResults = {};
                $scope.tableResults.numResults = 0;
            }
        });

        $scope.goToDetail = function(expId){
            var urlToDetail = "/backoffice/"+expId
            $location.path(urlToDetail);
        };

        $scope.isFioc = function(){
            return  ExpedientesModel.isFioc();
        };
    }])
    .directive('tocBody', ['$location', '$timeout', 'ExpedientesModel', function($location, $timeout, ExpedientesModel) {
    return {
        restrict: 'E',
        templateUrl: './js/directives/toc/tocbody/templates/tocbody.html',
        replace: true,
        scope: {
            tableInfo: "=",
            tableResults: "=",
            hideLocked: "=",
            goToDetail: "=",
            isFioc: "="
        },
        link: function($scope, elem){

            function getExpedientes() {
                if ($scope.isFioc()){
                    ExpedientesModel.setPageSize("15");
                }
                var callToallExpsWithFiler = ExpedientesModel.getAllExpedientesConFiltro(ExpedientesModel.getConfigObject());
                callToallExpsWithFiler.then(function (data) {
                    $scope.tableResults = data.data;
                });
            };

            $scope.$on('filterChange', function(event, args){
                var filterActive = ExpedientesModel.getFilter();
                var filter = args.toString();
                if (filterActive != filter){
                    $("#contentTable").hide();
                    ExpedientesModel.setPage("1");
                    ExpedientesModel.setFilter(filter);
                    getExpedientes();
                    $timeout(function(){$("#contentTable").fadeIn('slow')},2000);

                }
            });

            $scope.$on('pageSizeChange', function(event, args){
                var pageSizeActive = ExpedientesModel.getPageSize();
                var pageSize = args.toString();
                if (pageSizeActive != pageSize){
                    ExpedientesModel.setPageSize(pageSize);
                    ExpedientesModel.setPage("1");
                    getExpedientes();
                }
            });

            $scope.$on('pageChange', function(event, args){
                var pageActive = ExpedientesModel.getPage();
                var page = args.toString();
                if (pageActive != page){
                    elem.slideUp();
                    ExpedientesModel.setPage(args.toString());
                    getExpedientes();
                    elem.slideDown();
                }
            });
            getExpedientes();
        }
    };
}]);
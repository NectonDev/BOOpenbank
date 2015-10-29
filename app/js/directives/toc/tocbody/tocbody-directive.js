'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', '$location', 'ExpedientesModel', function($scope, $location, ExpedientesModel) {
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

        $scope.goToDetail = function(expId){
            var urlToDetail = "/backoffice/"+expId;
            $location.path(urlToDetail);
        };

        $scope.isFioc = function(){
            return ExpedientesModel.isFioc();
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
            isFioc: "=",
            printPage: "="
        },
        link: function($scope){

            function getExpedientes(){
                $("#contentTable").hide();
                ExpedientesModel.getAllExpedientesConFiltro().then(function (data){
                    $scope.tableResults = data.data;
                    $timeout(function(){$("#contentTable").fadeIn('slow')},1000);
                });
            }

            $scope.printPage = function(){
                $("#comboPageSize").hide();
                window.print();
                $("#comboPageSize").show();
            };

            $scope.$watch('hideLocked',function(data){
                if (typeof(data) != "undefined") {
                    //ExpedientesModel.setBloqueo(data);
                    getExpedientes();
                }
            });

            $scope.$on('filterChange', function(event, args){
                var filterActive = ExpedientesModel.getFilter();
                var filter = args.toString();
                var pageSizeCombo = $("#comboPageSize").text();
                if (filterActive != filter){
                    ExpedientesModel.setFilter(filter);
                    if (ExpedientesModel.isFioc()){
                        ExpedientesModel.setPageSize("15");
                    }else{
                        ExpedientesModel.setPageSize(pageSizeCombo);
                    }
                    ExpedientesModel.setPage("1");
                    getExpedientes();

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
                    ExpedientesModel.setPage(args.toString());
                    getExpedientes();
                }
            });

            getExpedientes();
        }
    };
}]);
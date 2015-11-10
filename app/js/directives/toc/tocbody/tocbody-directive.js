'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', '$location', 'ExpedientesModel', 'LiteralsConfigService', function($scope, $location, ExpedientesModel, LiteralsConfigService) {
        ExpedientesModel.setDefaultParameters();

        $scope.tocbodyInfo = LiteralsConfigService.getTocBodyLiterals();

        $scope.goToDetail = function(expId){
            var urlToDetail = "/backoffice/"+expId;
            $location.path(urlToDetail);
        };

        $scope.isFioc = function(){
            return ExpedientesModel.isFioc();
        };

        $scope.procesarUsuarios = function(){
            alert("Se van a procesar 11 usuaruis");
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
            printPage: "=",
            procesarUsuarios: "="
        },
        link: function($scope){

            function getExpedientes(){
                $("#contentTable").hide();
                ExpedientesModel.getAllExpedientesConFiltro().then(function(data){
                    $scope.tableResults = data;
                    $timeout(function(){$("#contentTable").fadeIn('slow')},500);
                });
            }

            $scope.printPage = function(){
                $(".mostrar_resultados").hide();
                window.print();
                $(".mostrar_resultados").show();
            };

            $scope.$watch('hideLocked',function(data){
                if (typeof(data) != "undefined") {
                    ExpedientesModel.setBloqueo(data);
                    getExpedientes();
                }else{
                    ExpedientesModel.setBloqueo(true);
                    getExpedientes();
                    //TODO: ARREGLAR ESTE ELSE
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
        }
    };
}]);
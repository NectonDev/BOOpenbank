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
            procesarUsuarios: "=",
            okProcess: "=",
            koProcess: "="
        },
        link: function($scope, elem){
            $scope.userOkProcess = [];
            $scope.userKoProcess = [];
            console.log(elem);
            function getExpedientes(){
                $("#contentTable").hide();
                ExpedientesModel.getAllExpedientesConFiltro().then(function(data){
                    $scope.tableResults = data;
                    $timeout(function(){$("#contentTable").fadeIn('slow')},500);
                });
            };

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

            $scope.procesarUsuarios = function(){
                console.log("Procesamos: " + $scope.userOkProcess);
                console.log("Rechazamos: " + $scope.userKoProcess);
                getExpedientes();
            };

            $scope.okProcess = function(usuario){
                console.log(elem);
                var indexOfOkArray = $scope.userOkProcess.indexOf(usuario.objName);
                var indexOfKoArray = $scope.userKoProcess.indexOf(usuario.objName);
                if (indexOfKoArray>-1){
                    $scope.userKoProcess.splice(indexOfKoArray, 1);
                }
                (indexOfOkArray>-1)?$scope.userOkProcess.splice(indexOfOkArray, 1):$scope.userOkProcess.push(usuario.objName);
            };

            $scope.koProcess = function(usuario, elem){
                console.log(elem);
                var indexOfOkArray = $scope.userOkProcess.indexOf(usuario.objName);
                var indexOfKoArray = $scope.userKoProcess.indexOf(usuario.objName);
                if (indexOfOkArray>-1){
                    $scope.userOkProcess.splice(indexOfOkArray, 1);
                }
                (indexOfKoArray>-1)?$scope.userKoProcess.splice(indexOfKoArray, 1):$scope.userKoProcess.push(usuario.objName);
            };
        }
    };
}]);
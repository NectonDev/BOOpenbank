'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', '$location', '$localStorage', 'ExpedientesModel', 'LiteralsConfigService', function($scope, $location, $localStorage, ExpedientesModel, LiteralsConfigService) {
        ExpedientesModel.setDefaultParameters();

        $scope.tocbodyInfo = LiteralsConfigService.getTocBodyLiterals();

        $scope.goToDetail = function(expId){
            var urlToDetail = "/backoffice/"+expId;
            $location.path(urlToDetail);
        };

        $scope.isFioc = function(){
            return ExpedientesModel.isFioc();
        };
        $scope.listAccionesFioc = $localStorage.accionesFioc;
    }])
    .directive('tocBody', ['$location', '$timeout', 'ExpedientesModel', function($location, $timeout, ExpedientesModel) {
    return {
        restrict: 'E',
        templateUrl: './js/directives/toc/tocbody/templates/tocbody.html',
        priority: 100,
        scope: {
            tableInfo: "=",
            tableResults: "=",
            hideLocked: "=",
            goToDetail: "=",
            isFioc: "=",
            printPage: "=",
            procesarUsuarios: "=",
            okProcess: "=",
            koProcess: "=",
            selectAccionFioc: "=",
            listAccionesFioc: "=",
            estado: "="
        },
        link: function($scope){
            $scope.estado = {};

            $scope.userOkProcess = [];
            $scope.userKoProcess = [];

            var OkToProcessArrayWithExp = [];
            var KoToProcessArrayWithExp = [];

            function getExpedientes(){
                $("#contentTable").hide();
                ExpedientesModel.getAllExpedientesConFiltro().then(function(data){
                    $scope.tableResults = data;
                    $timeout(function(){$("#contentTable").fadeIn('slow')},500);
                }).catch(function(data){
                    console.log(data);
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
                    ExpedientesModel.isFioc()?ExpedientesModel.setPageSize("15"):ExpedientesModel.setPageSize(pageSizeCombo);
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
                ExpedientesModel.procesarFioc(OkToProcessArrayWithExp,KoToProcessArrayWithExp).then(function(data){
                    getExpedientes();
                    $scope.estado = {};
                });
            };

            $scope.selectAccionFioc = function(usuario,expId,accion){
                if (accion!='No Procesar'){
                    if (accion==='Todo Correcto'){
                        $scope.okProcess(usuario,expId);
                    }else{
                        $scope.koProcess(usuario,expId,accion);
                    }
                }else{
                    var indexOfOkArray = $scope.userOkProcess.indexOf(usuario.objName);
                    var indexOfKoArray = $scope.userKoProcess.indexOf(usuario.objName);
                    if (indexOfKoArray>-1){
                        $scope.userKoProcess.splice(indexOfKoArray, 1);
                        KoToProcessArrayWithExp.splice(indexOfKoArray, 1);
                    }
                    if (indexOfOkArray>-1){
                        $scope.userOkProcess.splice(indexOfOkArray, 1);
                        OkToProcessArrayWithExp.splice(indexOfOkArray, 1);
                    }
                }
            };

            $scope.okProcess = function(usuario, expId){
                var indexOfOkArray = $scope.userOkProcess.indexOf(usuario.objName);
                var indexOfKoArray = $scope.userKoProcess.indexOf(usuario.objName);
                if (indexOfKoArray>-1){
                    $scope.userKoProcess.splice(indexOfKoArray, 1);
                    KoToProcessArrayWithExp.splice(indexOfKoArray, 1);
                }
                (indexOfOkArray>-1)?$scope.userOkProcess.splice(indexOfOkArray, 1):$scope.userOkProcess.push(usuario.objName);
                (indexOfOkArray>-1)?OkToProcessArrayWithExp.splice(indexOfOkArray, 1):OkToProcessArrayWithExp.push([usuario.objName,expId]);
            };

            $scope.koProcess = function(usuario, expId, motivoKo){
                var indexOfOkArray = $scope.userOkProcess.indexOf(usuario.objName);
                var indexOfKoArray = $scope.userKoProcess.indexOf(usuario.objName);
                if (indexOfOkArray>-1){
                    $scope.userOkProcess.splice(indexOfOkArray, 1);
                    OkToProcessArrayWithExp.splice(indexOfOkArray, 1);
                }
                (indexOfKoArray>-1)?$scope.userKoProcess.splice(indexOfKoArray, 1):$scope.userKoProcess.push(usuario.objName);
                (indexOfKoArray>-1)?KoToProcessArrayWithExp.splice(indexOfKoArray, 1):KoToProcessArrayWithExp.push([usuario.objName,expId, motivoKo]);
            };
        }
    };
}]);
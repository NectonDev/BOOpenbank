'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', '$location', '$localStorage', 'ExpedientesModel', 'LiteralsConfigService', 'TipoAppService', function($scope, $location, $localStorage, ExpedientesModel, LiteralsConfigService, TipoAppService) {
        ExpedientesModel.setDefaultParameters();

        $scope.tocbodyInfo = LiteralsConfigService.getTocBodyLiterals();

        $scope.tipoApp = TipoAppService.tipoApp();

        $scope.goToDetail = function(expId){
            var urlToDetail = "";
            if (TipoAppService.isBO()){
                urlToDetail = "/backoffice/"+expId;
            }
            if (TipoAppService.isCC()){
                urlToDetail = "/contactcenter/"+expId;
            }
            $location.path(urlToDetail);
        };

        $scope.isFioc = function(){
            return ExpedientesModel.isFioc();
        };

        $scope.isBloqueo = function(){
          return ExpedientesModel.isBloqueo();
        };

        $scope.isPteCancel = function(){
            return ExpedientesModel.isPteCancel();
        };

        $scope.listAccionesFioc = $localStorage.accionesFioc;
    }])
    .directive('tocBody', ['$location', '$timeout', '$sessionStorage', 'ExpedientesModel', 'AvisoModel', function($location, $timeout, $sessionStorage, ExpedientesModel, AvisoModel) {
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
            isBloqueo: "=",
            printPage: "=",
            procesarUsuarios: "=",
            bloquearCuentas: "=",
            cancelarCuentas: "=",
            block: "=",
            cancel: "=",
            okProcess: "=",
            koProcess: "=",
            usersToBlock: "=",
            userToCancel: "=",
            selectAccionFioc: "=",
            listAccionesFioc: "=",
            exportExcel: "=",
            isPteCancel: "=",
            tipoApp: "="
        },
        link: function($scope){
            $scope.estado = {};

            $scope.userOkProcess = [];
            $scope.userKoProcess = [];
            $scope.usersToBlock = [];
            $scope.userToCancel = [];

            var OkToProcessArrayWithExp = [];
            var KoToProcessArrayWithExp = [];
            var BlockArrayWithExp = [];
            var CancelArrayWithExp = [];

            function getExpedientes(){
                $("#contentTable").hide();
                ExpedientesModel.getAllExpedientesConFiltro().then(function(data){
                    $scope.tableResults = data;
                    $scope.exportExcel = ExpedientesModel.createJsonExcel(data.expedientes);
                    $timeout(function(){$("#contentTable").fadeIn('slow')},500);
                }).catch(function(data){
                    console.log(data);
                });
            };

            function getAvisos(){
                $("#contentTable").hide();
                AvisoModel.getAllAvisosByGestor($sessionStorage.infoUser.usuario).then(function(data){
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
                var pageSizeCombo = ExpedientesModel.getPageSize();
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

            $scope.$on('avisos', function(event, args){
                var filterActive = ExpedientesModel.getFilter();
                var filter = args.toString();
                if (filterActive != filter){
                    ExpedientesModel.setFilter(filter);
                    getAvisos();
                }
            });

            $scope.procesarUsuarios = function(){
                ExpedientesModel.procesarFioc(OkToProcessArrayWithExp,KoToProcessArrayWithExp).then(function(){
                    OkToProcessArrayWithExp = [];
                    KoToProcessArrayWithExp = [];
                    getExpedientes();
                });
            };

            $scope.bloquearCuentas = function(){
                ExpedientesModel.procesarBloqueo(BlockArrayWithExp).then(function(){
                    BlockArrayWithExp = [];
                    getExpedientes();
                });
            };

            $scope.cancelarCuentas = function(){
                ExpedientesModel.procesarCancelacion(CancelArrayWithExp).then(function(){
                    CancelArrayWithExp = [];
                    getExpedientes();
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

            $scope.block = function(usuario, expId){
                var indexOfBlockArray = $scope.usersToBlock.indexOf(usuario.objName);
                if (indexOfBlockArray>-1){
                    $scope.usersToBlock.splice(indexOfBlockArray, 1);
                    BlockArrayWithExp.splice(indexOfBlockArray, 1);
                }else{
                    $scope.usersToBlock.push(usuario.objName);
                    BlockArrayWithExp.push([usuario.objName,expId]);
                }
            };

            $scope.cancel = function(usuario, expId, motivo){
                var indexOfCancelArray = $scope.userToCancel.indexOf(usuario.objName);
                if (indexOfCancelArray>-1){
                    $scope.userToCancel.splice(indexOfCancelArray, 1);
                    CancelArrayWithExp.splice(indexOfCancelArray, 1);
                }else{
                    $scope.userToCancel.push(usuario.objName);
                    CancelArrayWithExp.push([usuario.objName,expId,motivo]);
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
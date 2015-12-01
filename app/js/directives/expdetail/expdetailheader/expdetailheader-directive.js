'use strict';

angular.module('expDetailHeaderDirective', ['ngDialog'])
    .controller('ExpDetailHeaderController', ['$scope', '$routeParams', '$location', '$localStorage', 'ngDialog', 'MotivosModel', 'ExpedientesModel', function($scope, $routeParams, $location, $localStorage, ngDialog, MotivosModel, ExpedientesModel) {
        var motivo = "";
        $scope.infoHeader = {
            IBANText: 'IBAN',
            IBANNumber: $localStorage.accountInfo.IBAN,
            EntidadText: 'Entidad',
            EntidadNumber: $localStorage.accountInfo.Entidad,
            OficinaText: 'Oficina',
            OficinaNumber: $localStorage.accountInfo.Oficina,
            DCText: 'DC'
        };
        $scope.$on('usersReqInfo', function(event, args){
            $scope.objNameTit = args.user0.dataUser.objName;
        });
        $scope.$on('expInfo', function(event, args){
            $scope.infoExpediente = args;
        });
        $scope.openDialog = function(){
            ngDialog.open({
                template: 'firstDialog',
                className: 'ngdialog-theme-default ngdialog-theme-custom',
                scope: $scope,
                closeByEscape: true,
                preCloseCallback: function(){
                    motivo = "";
                }
            });
        };
        $scope.goToObs = function(){
            var urlToObs = "/observaciones/"+$routeParams.expId;
            $location.path(urlToObs);
        };
        $scope.isObs = $location.$$path.indexOf("observaciones") > -1;
        $scope.isTd = $location.$$path.indexOf("cuestionario") > -1;
        $scope.motivosOptions = {
            choices: MotivosModel.getMotivos()
        };
        $scope.cancelExp = function(){
            ExpedientesModel.cancelExp($scope.objNameTit,$routeParams.expId,motivo).then(function(data){
                //TODO: Meter modal de expediente cancelado con exito.
                $location.path("/backoffice");
            });
        };
        $scope.selectMotivo = function(data){
            motivo = data;
        };
    }])
    .directive('expDetailHeader', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/expdetailheader/templates/expdetailheader.html',
        transclude: true,
        replace: true,
        scope: {
            infoHeader: "=",
            objNameTit: "=",
            infoExpediente: "=",
            openDialog: "=",
            goToObs: "=",
            isObs: "=",
            isTd: "=",
            motivosOptions: "=",
            cancelExp: "=",
            selectMotivo: "="
        }
    };
});
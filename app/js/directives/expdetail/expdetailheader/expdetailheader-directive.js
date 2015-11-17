'use strict';

angular.module('expDetailHeaderDirective', ['ngDialog'])
    .controller('ExpDetailHeaderController', ['$scope', '$routeParams', '$location', '$localStorage', 'ngDialog', 'MotivosModel', 'ExpedientesModel',  function($scope, $routeParams, $location, $localStorage, ngDialog, MotivosModel, ExpedientesModel) {
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
        $scope.motivosOptions = {
            choices: MotivosModel.getMotivos()
        };
        $scope.cancelExp = function(){
            ExpedientesModel.cancelExp("elusuario.999@mail.com",$routeParams.expId,motivo).then(function(data){
                console.log(data);
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
            infoExpediente: "=",
            openDialog: "=",
            goToObs: "=",
            isObs: "=",
            motivosOptions: "=",
            cancelExp: "=",
            selectMotivo: "="
        }
    };
});
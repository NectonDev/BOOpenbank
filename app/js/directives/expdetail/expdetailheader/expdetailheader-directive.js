'use strict';

angular.module('expDetailHeaderDirective', ['ngDialog'])
    .controller('ExpDetailHeaderController', ['$scope', '$routeParams', '$location', '$localStorage', 'ngDialog', function($scope, $routeParams, $location, $localStorage, ngDialog) {
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
                className: 'ngdialog-theme-default ngdialog-theme-custom'
            });
        };
        $scope.goToObs = function(){
            var urlToObs = "/observaciones/"+$routeParams.expId;
            $location.path(urlToObs);
        };
        $scope.isObs = $location.$$path.indexOf("observaciones") > -1;
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
            isObs: "="
        }
    };
});
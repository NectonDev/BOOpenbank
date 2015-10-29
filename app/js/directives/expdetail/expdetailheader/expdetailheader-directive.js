'use strict';

angular.module('expDetailHeaderDirective', ['ngDialog'])
    .controller('ExpDetailHeaderController', ['$scope', 'ngDialog', function($scope, ngDialog) {
        $scope.infoHeader = {
            IBANText: 'IBAN',
            IBANNumber: 'ES89',
            EntidadText: 'Entidad',
            EntidadNumber: '2229',
            OficinaText: 'Oficina',
            OficinaNumber: '9598',
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
            openDialog: "="
        }
    };
});
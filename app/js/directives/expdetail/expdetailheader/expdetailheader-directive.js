'use strict';

angular.module('expDetailHeaderDirective', [])
    .controller('ExpDetailHeaderController', ['$scope', function($scope) {
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
    }])
    .directive('expDetailHeader', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/expdetailheader/templates/expdetailheader.html',
        transclude: true,
        replace: true,
        scope: {
            infoHeader: "=",
            infoExpediente: "="
        }
    };
});
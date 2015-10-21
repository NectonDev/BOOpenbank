'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', 'ExpedientesModel', function($scope, ExpedientesModel) {
        $scope.tocbodyInfo = {
            numCuenta: 'N\u00FAmero cuenta',
            canal: 'Canal',
            interv: 'Interv.',
            gestor: 'Gestor',
            creationDate: 'Fecha Creaci\u00F3n',
            modDate: 'Fecha Modificaci\u00F3n'
        };

        $scope.$watch('hideLocked',function(data){
            if (data==true){
                $scope.tableResults = {};
                $scope.tableResults.numResults = 0;
            }else{
                var callToallExpsWithFiler = ExpedientesModel.getAllExpedientesConFiltro("1","20","");
                callToallExpsWithFiler.then(function(data){
                    $scope.tableResults = data.data;
                });
            }
        });

        $scope.$on('filterActive', function(event, args){
            console.log(args);
        });
    }])
    .directive('tocBody', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/toc/tocbody/templates/tocbody.html',
        transclude: true,
        replace: true,
        scope: {
            tableInfo: "=",
            tableResults: "=",
            hideLocked: "="
        }
    };
});
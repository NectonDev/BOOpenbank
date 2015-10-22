'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', '$location', 'ExpedientesModel', function($scope, $location, ExpedientesModel) {
        var config_object = new Object();

        config_object.page = "1";
        config_object.pageSize = "5";
        config_object.filter = "pendienteActivacion";

        $scope.tocbodyInfo = {
            numCuenta: 'N\u00FAmero cuenta',
            canal: 'Canal',
            interv: 'Interv.',
            gestor: 'Gestor',
            creationDate: 'Fecha Creaci\u00F3n',
            modDate: 'Fecha Modificaci\u00F3n'
        };

        function getExpedientes() {
            var callToallExpsWithFiler = ExpedientesModel.getAllExpedientesConFiltro(config_object);
            callToallExpsWithFiler.then(function (data) {
                $scope.tableResults = data.data;
            });
        }

        $scope.$watch('hideLocked',function(data){
            if (data){
                $scope.tableResults = {};
                $scope.tableResults.numResults = 0;
            }else{
                //getExpedientes();
            }
        });

        $scope.goToDetail = function(expId){
            var urlToDetail = "/backoffice/"+expId
            $location.path(urlToDetail);
        };

        $scope.$on('filterChange', function(event, args){
            config_object.filter = args.toString();
            getExpedientes();
        });
        $scope.$on('pageSizeChange', function(event, args){
            config_object.pageSize = args.toString();
            getExpedientes();
        });
        $scope.$on('pageChange', function(event, args){
            config_object.page = args.toString();
            getExpedientes();
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
            hideLocked: "=",
            goToDetail: "="
        }
    };
});
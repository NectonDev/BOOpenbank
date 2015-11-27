'use strict';

angular.module('observacionesDirective', [])
    .controller('ObservacionesController', ['$scope', '$location', '$routeParams', 'ObservacionesModel', 'ExpedientesModel', 'ExpedientesService', 'LoginService', function($scope, $location, $routeParams, ObservacionesModel, ExpedientesModel, ExpedientesService, LoginService) {
        LoginService.secureUrl();
        $scope.$on('$locationChangeStart', function(){
            if ($location.$$path === "/backoffice") {
                ExpedientesService.unlockExpediente(ExpedientesModel.getConfigObjectLockExp("",$routeParams.expId));
            }
        });
        ObservacionesModel.getObservacionesByExpId($routeParams.expId).then(function(data){
            $scope.observaciones = data;
        });
        ExpedientesModel.getExpedienteById($routeParams.expId).then(function(data){
            $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data[0]));
        });
    }])
    .directive('observaciones', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/observaciones/templates/observaciones.html',
            replace: true,
            scope: {
                observaciones: "="
            },
            link: function(){
                $("#backButton").on('click', function() {
                    window.history.back();
                });
            }
        };
    });
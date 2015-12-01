'use strict';

angular.module('cuestionarioDirective', [])
    .controller('CuestionarioController', ['$scope', '$location', '$routeParams', 'LoginService', 'ExpedientesModel', 'ExpedientesService', function($scope, $location, $routeParams, LoginService, ExpedientesModel, ExpedientesService) {
        LoginService.secureUrl();
        $scope.$on('$locationChangeStart', function(){
            if ($location.$$path === "/backoffice") {
                ExpedientesService.unlockExpediente(ExpedientesModel.getConfigObjectLockExp("",$routeParams.expId));
            }
        });
        ExpedientesModel.getExpedienteById($routeParams.expId).then(function(data){
            $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data[0]));
        });
    }])
    .directive('cuestionario', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/cuestionario/templates/cuestionario.html',
            replace: true,
            scope: {

            },
            link: function(){
                $("#backButton").on('click', function() {
                    window.history.back();
                });
            }
        };
    });
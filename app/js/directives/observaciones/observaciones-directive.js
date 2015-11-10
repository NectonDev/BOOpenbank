'use strict';

angular.module('observacionesDirective', [])
    .controller('ObservacionesController', ['$scope', '$routeParams', 'ObservacionesModel', 'LoginService', function($scope, $routeParams, ObservacionesModel, LoginService) {
        LoginService.secureUrl();
        ObservacionesModel.getObservacionesByExpId($routeParams.expId).then(function(data){
            $scope.observaciones = data;
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
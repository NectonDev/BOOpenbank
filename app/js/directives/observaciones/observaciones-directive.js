'use strict';

angular.module('observacionesDirective', [])
    .controller('ObservacionesController', ['$scope', '$routeParams', 'ObservacionesModel', 'LoginModel', function($scope, $routeParams, ObservacionesModel, LoginModel) {
        LoginModel.secureUrl();
        var observaciones = ObservacionesModel.getObservacionesByExpId($routeParams.expId);
        observaciones.then(function(data){
            $scope.observaciones = ObservacionesModel.transformInfoObservaciones(data.data.observaciones);
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
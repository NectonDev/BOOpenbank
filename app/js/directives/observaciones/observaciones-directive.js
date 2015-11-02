'use strict';

angular.module('observacionesDirective', [])
    .controller('ObservacionesController', ['$scope', '$routeParams', 'ObservacionesModel', function($scope, $routeParams, ObservacionesModel) {
        var observaciones = ObservacionesModel.getObservacionesByExpId($routeParams.expId);
        observaciones.then(function(data){
            console.log(data);
            $scope.observaciones = data.data.observaciones;
        });
    }])
    .directive('observaciones', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/observaciones/templates/observaciones.html',
            replace: true,
            scope: {
                observaciones: "="
            }
        };
    });
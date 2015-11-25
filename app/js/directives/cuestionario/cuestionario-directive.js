'use strict';

angular.module('cuestionarioDirective', [])
    .controller('CuestionarioController', ['$scope', 'LoginService', function($scope, LoginService) {
        LoginService.secureUrl();
    }])
    .directive('cuestionario', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/cuestionario/templates/cuestionario.html',
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
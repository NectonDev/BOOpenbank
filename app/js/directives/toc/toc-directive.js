'use strict';

angular.module('tocDirective', [])
    .controller('TocController', ['$scope', 'LoginService', 'TipoAppService', function($scope, LoginService, TipoAppService) {
        LoginService.secureUrl();

        $scope.tipoApp = TipoAppService.tipoApp();

    }])
    .directive('toc', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/templates/toc.html',
            replace: true,
            scope: {
                tipoApp: "="
            }
        };
    });
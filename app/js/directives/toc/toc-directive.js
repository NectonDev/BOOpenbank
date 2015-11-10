'use strict';

angular.module('tocDirective', [])
    .controller('TocController', ['LoginService', function(LoginService) {
        LoginService.secureUrl();
    }])
    .directive('toc', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/templates/toc.html',
            replace: true
        };
    });
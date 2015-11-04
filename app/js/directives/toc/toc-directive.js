'use strict';

angular.module('tocDirective', [])
    .controller('TocController', ['LoginModel', function(LoginModel) {
        LoginModel.secureUrl();
    }])
    .directive('toc', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/templates/toc.html',
            replace: true
        };
    });
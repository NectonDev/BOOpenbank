'use strict';

angular.module('tocDirective', [])
    .controller('TocController', ['$scope', function($scope) {

    }])
    .directive('toc', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/toc/templates/toc.html',
            replace: true
        };
    });
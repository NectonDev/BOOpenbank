'use strict';

angular.module('headerDirective', [])
    .controller('HeaderController', ['$scope', function($scope) {
        $scope.headerInfo = {
            headerValue: 'H\u00E1gase cliente m\u00F3vil',
            logoOpenBank: 'images/logo_blanco.png',
            buttonBackOffice: 'BACKOFFICE',
            buttonContactCenter: 'CONTACT CENTER'
        };
    }])
    .directive('mainHeader', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/header/templates/header.html'
        };
    });
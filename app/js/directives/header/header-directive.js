'use strict';

angular.module('headerDirective', [])
    .controller('HeaderController', ['$scope', '$sessionStorage', 'LoginModel', function($scope, $sessionStorage, LoginModel) {
        $scope.headerInfo = {
            headerValue: 'H\u00E1gase cliente m\u00F3vil',
            logoOpenBank: 'images/logo_blanco.png',
            buttonBackOffice: 'BACKOFFICE',
            buttonContactCenter: 'CONTACT CENTER'
        };
        var userLogged = LoginModel.getInfoUserLogged();
        userLogged?$scope.usuario=userLogged.usuario:$scope.usuario = "";
    }])
    .directive('mainHeader', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/header/templates/header.html',
            replace: true,
            scope: {
                mainInfo: "=",
                usuario: "="
            }
        };
    });
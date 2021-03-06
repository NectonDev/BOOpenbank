'use strict';

angular.module('headerDirective', [])
    .controller('HeaderController', ['$scope', '$sessionStorage', '$location', 'LoginService', function($scope, $sessionStorage, $location, LoginService) {
        $scope.headerInfo = {
            headerValue: 'H\u00E1gase cliente tramitaci\u00F3n',
            logoOpenBank: 'images/logo_blanco.png',
            buttonBackOffice: 'BACKOFFICE',
            buttonContactCenter: 'CONTACT CENTER'
        };

        if ($sessionStorage.infoUser===undefined){
            $scope.usuario = "";
        }else{
            $scope.usuario = $sessionStorage.infoUser.usuario
        }

        $scope.$on('logged', function(event, args){
            $scope.usuario = args;
        });

        $scope.doLogout = function(){
            LoginService.doLogout();
            $scope.usuario = $sessionStorage.infoUser.usuario;
            $location.path("/login");
        };
    }])
    .directive('mainHeader', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/header/templates/header.html',
            replace: true,
            scope: {
                mainInfo: "=",
                usuario: "=",
                doLogout: "="
            }
        };
    });
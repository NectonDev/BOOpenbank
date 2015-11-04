'use strict';

angular.module('headerDirective', [])
    .controller('HeaderController', ['$scope', '$sessionStorage', '$location', 'LoginModel', function($scope, $sessionStorage, $location, LoginModel) {
        $scope.headerInfo = {
            headerValue: 'H\u00E1gase cliente m\u00F3vil',
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
            LoginModel.doLogout();
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
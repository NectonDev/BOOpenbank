'use strict';

angular.module('loginDirective', [])
    .controller('LoginController', ['$scope', '$rootScope', '$location', '$sessionStorage', 'LoginService', function($scope, $rootScope, $location, $sessionStorage, LoginService) {
        if (LoginService.isLogged()){
            $location.path("/backoffice");
        }

        $scope.doLogin = function(data){
            LoginService.setConfigObjectLogin(data);
            var usuario = data.usuario;
            LoginService.doLogin().then(function(data){
                if (data.data.acceso === "0"){
                    $sessionStorage.infoUser = {};
                    $sessionStorage.infoUser.usuario = usuario;
                    $sessionStorage.infoUser.isLogged = true;
                    $rootScope.$broadcast('logged', usuario);
                    $location.path("/backoffice");
               }
            });
        }
    }])
    .directive('login', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/login/templates/login.html',
            replace: true,
            scope: {
                doLogin: "="
            }
        };
    });
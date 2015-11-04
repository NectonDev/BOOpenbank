'use strict';

angular.module('loginDirective', [])
    .controller('LoginController', ['$scope', '$rootScope', '$location', '$sessionStorage', 'LoginModel', function($scope, $rootScope, $location, $sessionStorage, LoginModel) {
        if (LoginModel.isLogged()){
            $location.path("/backoffice");
        }

        $scope.doLogin = function(data){
            LoginModel.setConfigObjectLogin(data);
            var usuario = data.usuario;
            var doLogin = LoginModel.doLogin();
            doLogin.then(function(data){
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
'use strict';

angular.module('loginDirective', [])
    .controller('LoginController', ['$scope', '$location', '$sessionStorage', 'LoginModel', function($scope, $location, $sessionStorage, LoginModel) {
        $scope.doLogin = function(data){
            LoginModel.setConfigObject(data);
            var usuario = data.usuario;
            var doLogin = LoginModel.doLogin();
            doLogin.then(function(data){
                if (data.data.acceso === "0"){
                    $sessionStorage.infoUser = {};
                    $sessionStorage.infoUser.usuario = usuario;
                    $sessionStorage.infoUser.isLogged = true;
                    $location.path("/backoffice");
                    //TODO: Hacer broadcast evento logeado para cambiar cabecera
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
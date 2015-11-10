angular.module('LoginService',[])
    .service('LoginService', ['$http', '$sessionStorage', 'APIConfigService', function ($http, $sessionStorage, APIConfigService) {
        var service = this;

        var config_object_login = {};

        getConfigObjectLogin = function(){
            return config_object_login;
        };

        service.setConfigObjectLogin = function(data){
            config_object_login = data;
        };

        service.doLogin = function(){
            return $http.post(
                APIConfigService.getUrlLogin(),
                getConfigObjectLogin(),
                APIConfigService.getHeaders()
            );
        };

        service.doLogout = function(){
            $sessionStorage.infoUser = {};
        };

        service.isLogged = function(){
            var isLogged;
            if ($sessionStorage.infoUser===undefined){
                isLogged = false;
            }else{
                ($sessionStorage.infoUser.isLogged)?isLogged=true:isLogged=false;
            }
            return isLogged;
        };

        service.secureUrl = function(){
            if (service.isLogged()===false){
                $location.path("/login");
            }
        };

        return service;
    }]);
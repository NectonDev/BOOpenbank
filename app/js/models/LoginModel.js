angular.module('LoginService',[])
    .factory('LoginModel', ['$http', '$sessionStorage', 'APIConfigService', function ($http, $sessionStorage, APIConfigService) {
        var service = this;

        var config_object = {};

        getConfigObject = function(){
            return config_object;
        };
        service.setConfigObject = function(data){
            config_object = data;
        };

        service.doLogin = function(){
            return $http.post(
                APIConfigService.getUrlLogin(),
                getConfigObject(),
                APIConfigService.getHeaders()
            );
        };

        service.isLogged = function(){
            return $sessionStorage.infoUser.isLogged;
        };

        service.getInfoUserLogged = function(){
            return $sessionStorage.infoUser;
        };

        return service;
    }]);
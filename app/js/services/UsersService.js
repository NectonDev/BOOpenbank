angular.module('UsersService',[])
    .service('UsersService', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getInfoUserById = function(configObject){
            return $http.post(
                APIConfigService.getUrlLeerExpediente(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
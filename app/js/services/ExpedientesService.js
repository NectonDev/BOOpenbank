angular.module('ExpedientesService',[])
    .service('ExpedientesService', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getAllExpedientesConFiltro = function(configObject){
            return $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.getExpedienteById = function(configObject){
            return $http.post(
                APIConfigService.getUrlLeerExpediente(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.lockExpediente = function(configObject){
            return $http.post(
                APIConfigService.getUrlBloquearExpediente(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.unlockExpediente = function(configObject){
            return $http.post(
                APIConfigService.getUrlDesbloquearExpediente(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.isExpLocked = function(configObject){
            return $http.post(
                APIConfigService.getUrl(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
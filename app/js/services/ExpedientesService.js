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

        return service;
    }]);
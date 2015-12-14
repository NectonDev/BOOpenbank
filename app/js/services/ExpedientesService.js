angular.module('ExpedientesService',[])
    .service('ExpedientesService', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getAllExpsSearch = function(configObject){
            return $http.post(
                APIConfigService.getUrlLeerExpedientes(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

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

        service.pteCancelExpediente = function(configObject){
            return $http.post(
                APIConfigService.getUrlPteCancelarExpediente(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.cancelExpediente = function(configObject){
            return $http.post(
                APIConfigService.getUrlCancelarExpediente(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.procesarFioc = function(configObject){
            return $http.post(
                APIConfigService.getUrlProcesadoFioc(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.bloquearCuenta = function(configObject){
            return $http.post(
                APIConfigService.getUrlBloquearCuenta(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        service.updateExp = function(configObject){
            return $http.post(
                APIConfigService.getUrlActualizarRequisito(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
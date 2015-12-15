angular.module('AvisosService',[])
    .service('AvisosService', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getAllAvisosByExp = function(configObject){
            return $http.post(
                APIConfigService.getUrlListaAvisos(),
                configObject,
                APIConfigService.getHeaders()
            );
        };
        service.getAllAvisosByGestor = function(configObject){
            return $http.post(
                APIConfigService.getUrlListaAvisosGestor(),
                configObject,
                APIConfigService.getHeaders()
            );
        };
        service.getAllAvisosHistorico = function(configObject){
            return $http.post(
                APIConfigService.getUrlListaAvisosHistorico(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
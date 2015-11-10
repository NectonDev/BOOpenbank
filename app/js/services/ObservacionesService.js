angular.module('ObservacionesService',[])
    .service('ObservacionesService', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getObservacionesByExpId = function(configObject){
            return $http.post(
                APIConfigService.getUrlLeerObservaciones(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
angular.module('DocumentosService',[])
    .service('DocumentosService', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.addDocument = function(configObject){
            return $http.post(
                APIConfigService.getUrlAdjuntarDocumento(),
                configObject,
                APIConfigService.getHeaders()
            );
        };

        /*service.getAllDocumentsByExp = function(configObject){
            return $http.post(
                APIConfigService.getUrlAdjuntarDocumento(),
                configObject,
                APIConfigService.getHeaders()
            );
        };*/

        return service;
    }]);
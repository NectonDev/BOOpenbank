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

        service.getDocumentsByUser = function(expId,userObjName){
            return $http.get(
                APIConfigService.getUrlLeerDocumentos(expId,userObjName,"dctm_ok_tr_doctramit")
            );
        };

        return service;
    }]);
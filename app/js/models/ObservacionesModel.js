angular.module('ObservacionesService',[])
    .factory('ObservacionesModel', ['$http', 'APIConfigService', function ($http, APIConfigService) {
        var service = this;

        getConfigObjectById = function(expId){
            return {
                "expediente": {
                    "r_object_id": expId
                }
            }
        };

        service.getObservacionesByExpId = function(expId){
            return $http.post(
                APIConfigService.getUrlLeerObservaciones(),
                getConfigObjectById(expId),
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
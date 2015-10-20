angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http','APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getAllExpedientesConFiltro = function(filtro){
            var allExpedientes  = $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                {
                    "expediente": {
                        "page" : "1",
                        "results" : "5" ,
                        "filtro" : filtro
                    }
                },
                {
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            );
            allExpedientes.then(function(data){
                return data;
            });
            return allExpedientes;
        };

        /*service.getExpedienteById = function(expediente_id){
            return $http.post(APIConfigService.getUrlLeerExpediente())
            .then(function(result){
                console.log(result);
            });
        };*/

        return service;
    }]);
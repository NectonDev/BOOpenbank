angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http','APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getAllExpedientesConFiltro = function(config_object){
            var allExpedientes  = $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                {
                    "expediente": {
                        "page" : config_object.page,
                        "results" : config_object.pageSize,
                        "filtro" : config_object.filter
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
            }, function(data){
                console.log(data);
            });
            return allExpedientes;
        };

        service.getExpedienteById = function(expId){
            var expediente  = $http.post(
                APIConfigService.getUrlLeerExpediente(),
                {
                    "expediente": {
                        "r_object_id": expId
                    }
                },
                {
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            );
            expediente.then(function(data){
                return data;
            }, function(data){
                console.log(data);
            });
            return expediente;
        };

        return service;
    }]);
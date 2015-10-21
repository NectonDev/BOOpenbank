angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http','APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.setPageParam = function(page){
            page = (typeof page === 'undefined') ? '1' : page;
        };
        service.setPageParam = function(page){
            page = (typeof page === 'undefined') ? '1' : page;
        };
        service.setPageParam = function(page){
            page = (typeof page === 'undefined') ? '1' : page;
        };
        service.getPageParam = function(page){
            page = (typeof page === 'undefined') ? '1' : page;
        };
        service.getSizeParam = function(page){
            s = (typeof page === 'undefined') ? '1' : page;
        };
        service.getFilterParam = function(page){
            page = (typeof page === 'undefined') ? '1' : page;
        };

        service.getAllExpedientesConFiltro = function(page, results, filtro){
            var allExpedientes  = $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                {
                    "expediente": {
                        "page" : page,
                        "results" : results ,
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
            }, function(data){
                //console.log(data);
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
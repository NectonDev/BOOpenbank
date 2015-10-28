angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http','APIConfigService', 'EstadosModel', function ($http, APIConfigService, EstadosModel) {
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

        service.createInfoExpediente = function(dataExpediente){
            var infoExpediente = new Object();
            infoExpediente.id = dataExpediente.r_object_id;
            infoExpediente.num_cuenta = dataExpediente.codigo_cuenta_creada;
            infoExpediente.estado = EstadosModel.getEstadoById(dataExpediente.estado);
            infoExpediente.fecha_alta = dataExpediente.r_creation_date.split("T")[0];
            infoExpediente.fecha_mod = dataExpediente.r_modify_date.split("T")[0];
            return infoExpediente;
        };

        return service;
    }]);
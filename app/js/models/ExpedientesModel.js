angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http','APIConfigService', 'EstadosModel', function ($http, APIConfigService, EstadosModel) {
        var service = this;
        var config_object = new Object();

        service.getConfigObject = function(){
            return config_object;
        };

        service.setPage = function(page){
            config_object.page=page;
        };
        service.setPageSize = function(pageSize){
            config_object.pageSize=pageSize;
        };
        service.setFilter = function(filter){
            config_object.filtro=filter;
        };

        service.getPage = function(){
            return config_object.page;
        };

        service.getPageSize = function(){
            return config_object.pageSize;
        };

        service.getFilter = function(){
            return config_object.filtro;
        };

        service.setDefaultParameters = function(){
            config_object.page = APIConfigService.getDefaultPageExpediente();
            config_object.pageSize = APIConfigService.getDefaultPageSizeExpediente();
            config_object.filtro = APIConfigService.getDefaultFilterExpediente();
        };

        service.isFioc = function(){
            return config_object.filtro === "fioc";
        };

        service.getAllExpedientesConFiltro = function(){
            var allExpedientes  = $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                {
                    "expediente": config_object
                },
                {
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            );
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
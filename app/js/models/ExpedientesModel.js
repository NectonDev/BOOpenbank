angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http', '$localStorage', 'APIConfigService', 'EstadosModel', function ($http, $localStorage, APIConfigService, EstadosModel) {
        var service = this;
        var config_object = {};

        getConfigObject = function(){
            return {
                expediente : config_object
            }
        };

        getConfigObjectById = function(expId){
            return {
                "expediente": {
                    "r_object_id": expId
                }
            }
        };

        service.setPage = function(page){
            config_object.page=page;
        };

        service.setPageSize = function(pageSize){
            config_object.results=pageSize;
        };

        service.setFilter = function(filter){
            config_object.filtro=filter;
        };

        service.setBloqueo = function(bloqueo){
            config_object.bloqueo=bloqueo;
        };

        service.getPage = function(){
            return config_object.page;
        };

        service.getPageSize = function(){
            return config_object.results;
        };

        service.getFilter = function(){
            return config_object.filtro;
        };

        service.getBloqueo = function(){
            return config_object.bloqueo;
        };

        service.setDefaultParameters = function(){
            config_object.page = APIConfigService.getDefaultPageExpediente();
            config_object.results = APIConfigService.getDefaultPageSizeExpediente();
            config_object.filtro = APIConfigService.getDefaultFilterExpediente();
            //config_object.bloqueo = APIConfigService.getDefaultBloqueoExpediente();
        };

        service.isFioc = function(){
            return config_object.filtro === $localStorage.tiposPreFiltros.fioc;
        };

        service.transformInfoExpediente = function(dataExpediente){
            var infoExpediente = {};
            infoExpediente.id = dataExpediente.r_object_id;
            infoExpediente.num_cuenta = dataExpediente.codigo_cuenta_creada;
            infoExpediente.estado = EstadosModel.getEstadoById(dataExpediente.estado);
            infoExpediente.fecha_alta = dataExpediente.r_creation_date.split("T")[0];
            infoExpediente.fecha_mod = dataExpediente.r_modify_date.split("T")[0];
            return infoExpediente;
        };

        service.getAllExpedientesConFiltro = function(){
            return $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                getConfigObject(),
                APIConfigService.getHeaders()
            );
        };

        service.getExpedienteById = function(expId){
            return $http.post(
                APIConfigService.getUrlLeerExpediente(),
                getConfigObjectById(expId),
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
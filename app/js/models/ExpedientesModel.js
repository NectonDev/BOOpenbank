angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http', '$localStorage', 'APIConfigService', 'EstadosModel', function ($http, $localStorage, APIConfigService, EstadosModel) {
        var service = this;
        var config_object_exp = {};

        getConfigObjectExp = function(){
            return {
                expediente : config_object_exp
            }
        };

        getConfigObjectExpById = function(expId){
            return {
                "expediente": {
                    "r_object_id": expId
                }
            }
        };

        calculaDCParcial = function (cadena){
            var dcParcial = 0;
            var tablaPesos = [6,3,7,9,10,5,8,4,2,1];
            var suma = 0;
            var i;
            for(i=0;i<cadena.length;i++){
                suma = suma + cadena.charAt(cadena.length-1-i)*tablaPesos[i];
            }
            dcParcial = (11-(suma % 11));
            if(dcParcial==11)
                dcParcial=0;
            else if(dcParcial==10)
                dcParcial=1;
            return dcParcial.toString();
        }

        service.setPage = function(page){
            config_object_exp.page=page;
        };

        service.setPageSize = function(pageSize){
            config_object_exp.results=pageSize;
        };

        service.setFilter = function(filter){
            config_object_exp.filtro=filter;
        };

        service.setBloqueo = function(bloqueo){
            config_object_exp.bloqueo=bloqueo;
        };

        service.getPage = function(){
            return config_object_exp.page;
        };

        service.getPageSize = function(){
            return config_object_exp.results;
        };

        service.getFilter = function(){
            return config_object_exp.filtro;
        };

        service.getBloqueo = function(){
            return config_object_exp.bloqueo;
        };

        service.setDefaultParameters = function(){
            config_object_exp.page = APIConfigService.getDefaultPageExpediente();
            config_object_exp.results = APIConfigService.getDefaultPageSizeExpediente();
            config_object_exp.filtro = APIConfigService.getDefaultFilterExpediente();
            //config_object_exp.bloqueo = APIConfigService.getDefaultBloqueoExpediente();
        };

        service.isFioc = function(){
            return config_object_exp.filtro === $localStorage.tiposPreFiltros.fioc;
        };

        service.transformUserExpInfo = function(dataExpediente){
            var userExp = {};
            for (var i=0;i<dataExpediente.length;i++){
                userExp[i] = {};
                userExp[i].nombre = dataExpediente[i].usuario.docident_nom_val;
                userExp[i].apellido1 = dataExpediente[i].usuario.docident_ape1_val;
                userExp[i].apellido2 = dataExpediente[i].usuario.docident_ape2_val;
                userExp[i].empresa = dataExpediente[i].usuario.kyc_empresa;
                userExp[i].actividad = dataExpediente[i].usuario.kyc_actividad_empresa;
            }
            return userExp;
        };

        service.transformInfoExpediente = function(dataExpediente){
            var infoExpediente = {};
            var accountInfo = $localStorage.accountInfo;
            infoExpediente.id = dataExpediente.r_object_id;
            infoExpediente.num_cuenta = dataExpediente.codigo_cuenta_creada;
            infoExpediente.digitoControl = calculaDCParcial(accountInfo.Entidad+accountInfo.Oficina)+calculaDCParcial(dataExpediente.codigo_cuenta_creada);
            infoExpediente.plataforma = dataExpediente.plataforma;
            infoExpediente.estado = EstadosModel.getEstadoById(dataExpediente.estado);
            infoExpediente.fecha_alta = dataExpediente.r_creation_date;
            infoExpediente.fecha_mod = dataExpediente.r_modify_date;
            infoExpediente.gestor = dataExpediente.usuario_bloqueo;
            return infoExpediente;
        };

        service.transformInfoExpedientes = function(dataExpedientes){
            var infoExpedientes = {};
            infoExpedientes.expedientes = {};
            infoExpedientes.numResults = dataExpedientes.numResults;
            for (var i=0;i<dataExpedientes.expedientes.length;i++){
                infoExpedientes.expedientes[i] = service.transformInfoExpediente(dataExpedientes.expedientes[i].expediente);
                infoExpedientes.expedientes[i].numInterv = dataExpedientes.expedientes[i].usuarios.length;
                infoExpedientes.expedientes[i].usuarios = service.transformUserExpInfo(dataExpedientes.expedientes[i].usuarios);
            }
            return infoExpedientes;
        };

        service.getAllExpedientesConFiltro = function(){
            return $http.post(
                APIConfigService.getUrlLeerExpedientesFiltros(),
                getConfigObjectExp(),
                APIConfigService.getHeaders()
            );
        };

        service.getExpedienteById = function(expId){
            return $http.post(
                APIConfigService.getUrlLeerExpediente(),
                getConfigObjectExpById(expId),
                APIConfigService.getHeaders()
            );
        };

        return service;
    }]);
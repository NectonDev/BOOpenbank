angular.module('ExpedientesModel',[])
    .service('ExpedientesModel', ['$http', '$localStorage', '$sessionStorage', 'ngDialog', 'APIConfigService', 'ExpedientesService', 'EstadosModel', function ($http, $localStorage, $sessionStorage, ngDialog, APIConfigService, ExpedientesService, EstadosModel) {
        var service = this;
        var config_object_exp = {};
        var numTotalResultados = 0;

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

        getConfigObjectCancelExp = function(userObjName, expId, motivo){
            return {
                "usuarios": [
                    {
                        "usuario": {
                            "object_name": userObjName
                        }
                    }
                ],
                "expediente": {
                    "r_object_id": expId,
                    "motivo_cancelacion": motivo
                }
            }
        };

        getConfigObjectProcesarFioc = function(objName,expId,valid){
            return {
                "usuarios": [
                    {
                        "usuario": {
                            "object_name": objName,
                            "req_3adir_estado": valid
                        }
                    }
                ],
                    "expediente": {
                    "r_object_id": expId
                }
            }
        };

        getConfigObjectUpdateExp = function(objName,expID){
            return {
                "usuarios": [
                    {
                        "usuario": {
                            "object_name": objName
                        }
                    }
                ],
                "expediente": {
                    "r_object_id": expID
                }
            }
        };

        service.getConfigObjectLockExp = function(userId,expId){
            return {
                "expediente": {
                    "r_object_id": expId,
                    "usuario_bloqueo": userId
                }
            }
        };

        calculaDCParcial = function (cadena){
            //var dcParcial = 0;
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
        };

        service.setDefaultParameters = function(){
            config_object_exp.page = APIConfigService.getDefaultPageExpediente();
            config_object_exp.results = APIConfigService.getDefaultPageSizeExpediente();
            config_object_exp.filtro = APIConfigService.getDefaultFilterExpediente();
            config_object_exp.bloqueo = APIConfigService.getDefaultBloqueoExpediente();
        };

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

        service.isFioc = function(){
            return config_object_exp.filtro === $localStorage.tiposPreFiltros.fioc;
        };

        service.transformUserExpInfo = function(dataExpediente){
            var userExp = {};
            for (var i=0;i<dataExpediente.length;i++){
                userExp[i] = {};
                userExp[i].objName = dataExpediente[i].usuario.object_name;
                userExp[i].id = dataExpediente[i].usuario.r_object_id;
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
            if (dataExpediente.estado === "s06" || dataExpediente.estado === "s07" ){
                infoExpediente.estado = EstadosModel.getEstadoById(dataExpediente.estado_validacion);
            }else{
                infoExpediente.estado = EstadosModel.getEstadoById(dataExpediente.estado);
            }

            infoExpediente.fecha_alta = dataExpediente.r_creation_date;
            infoExpediente.fecha_mod = dataExpediente.r_modify_date;
            infoExpediente.gestor = dataExpediente.usuario_bloqueo;
            return infoExpediente;
        };

        service.transformInfoExpedientes = function(dataExpedientes){
            var infoExpedientes = {};
            infoExpedientes.expedientes = {};
            infoExpedientes.numResults = dataExpedientes.numResults;
            numTotalResultados = dataExpedientes.numResults;
            for (var i=0;i<dataExpedientes.expedientes.length;i++){
                infoExpedientes.expedientes[i] = service.transformInfoExpediente(dataExpedientes.expedientes[i].expediente);
                infoExpedientes.expedientes[i].numInterv = dataExpedientes.expedientes[i].usuarios.length;
                infoExpedientes.expedientes[i].usuarios = service.transformUserExpInfo(dataExpedientes.expedientes[i].usuarios);
            }
            return infoExpedientes;
        };

        service.getAllExpedientesConFiltro = function(){
            return ExpedientesService.getAllExpedientesConFiltro(getConfigObjectExp()).then(function(data){
                return service.transformInfoExpedientes(data.data);
            });
        };

        service.getExpedienteById = function(expId){
            return ExpedientesService.getExpedienteById(getConfigObjectExpById(expId)).then(function(data){
                return [data.data.expediente,data.data.usuarios];
            });
        };

        service.getNumTotalExpedientes = function(){
            return numTotalResultados;
        };

        service.makePagination = function(tableResults){
            var arrayOfPages = [];
            var arrayOfPageToShow = [];
            var pageActual = parseInt(config_object_exp.page);
            var numExpedientes = tableResults.numResults;
            var leftToShow;
            var rightToShow;
            if (pageActual===1 || pageActual===2 || pageActual===3){
                leftToShow = 0;
                rightToShow = 5;
            }else{
                leftToShow = pageActual - 3;
                rightToShow = pageActual + 2;
            }
            var arrayNumPages = (numExpedientes / config_object_exp.results).toString().split(".");
            if (arrayNumPages[0]==0){
                arrayOfPages.push(1);
            }else{
                for (var i=0;i<arrayNumPages[0];i++) {
                    arrayOfPages.push(i + 1);
                }
                if (arrayNumPages[1] > 0){
                    arrayOfPages.push(arrayOfPages.length+1);
                }
            }
            var part1OnePages= arrayOfPages.slice(leftToShow,pageActual);
            var partTwoPages = arrayOfPages.slice(pageActual,rightToShow);
            for (var i=0;i<part1OnePages.length;i++){
                arrayOfPageToShow.push(part1OnePages[i]);
            }
            for (var i=0;i<partTwoPages.length;i++){
                arrayOfPageToShow.push(partTwoPages[i]);
            }
            return arrayOfPageToShow;
        };

        service.isExpLocked = function(expId){
            return ExpedientesService.getExpedienteById(getConfigObjectExpById(expId)).then(function(data){
                var isLocked;
                data.data.expediente.usuario_bloqueo===""?isLocked="":isLocked=data.data.expediente.usuario_bloqueo;
                return isLocked;
            });
        };

        service.cancelExp = function(userObjName,expId,motivo){
            return ExpedientesService.cancelExpediente(getConfigObjectCancelExp(userObjName,expId,motivo)).then(function(data){
                ngDialog.closeAll();
                return data;
            });
        };

        service.procesarFioc = function(okToProcess,koToProcess){
            var expedientes = { expedientes:[]};
            angular.forEach(okToProcess,function(value){
                expedientes.expedientes.push(getConfigObjectProcesarFioc(value[0],value[1],"RV"));
            });
            angular.forEach(koToProcess,function(value){
                expedientes.expedientes.push(getConfigObjectProcesarFioc(value[0],value[1],"RR"));

            });
            return ExpedientesService.procesarFioc(expedientes).then(function(data){
                //TODO: Modal de procesador correctamente
            });
        };

        service.updateExp = function(userObjName,reqToUpdate, estadoToUpdate, motivoRechazo, expId){
            var configObjectUpdateExp = getConfigObjectUpdateExp(userObjName,expId);
            configObjectUpdateExp.usuarios[0].usuario[reqToUpdate] = estadoToUpdate;

            console.log(configObjectUpdateExp);
            /*return ExpedientesService.updateExp(getConfigObjectUpdateExp(userObjName,expId)).then(function(data){
                return data;
            });*/
        };

        return service;
    }]);
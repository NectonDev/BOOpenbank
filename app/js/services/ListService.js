angular.module('ListService',[])
    .service('ListService', ['$http', '$localStorage', 'APIConfigService', function ($http, $localStorage, APIConfigService) {
        var service = this;
        var headers_object = APIConfigService.getHeaders();

        service.getListEstados = function(){
            var allEstados = $http.get(
                APIConfigService.getUrlListaEstados(),
                headers_object
            );
            allEstados.then(function(data){
                $localStorage.tiposEstados = data.data;
            }).catch(function(data){
                console.log("Error recuperando los estados: " + data);
            });
        };

        service.getListReq = function(){
            var allReq = $http.get(
                APIConfigService.getUrlListaReq(),
                headers_object
            );
            allReq.then(function(data){
                $localStorage.listaReq = data.data;
            }).catch(function(data){
                console.log("Error recuperando los requisitos: " + data);
            });
        };

        service.getListEstadosReq = function(){
            var allEstadosReq = $http.get(
                APIConfigService.getUrlListaEstadosReq(),
                headers_object
            );
            allEstadosReq.then(function(data){
                $localStorage.listaEstadosReq = data.data;
            }).catch(function(data){
                console.log("Error recuperando los estados de los requisitos: " + data);
            });
        };

        service.getListRechazosReq = function(){
            var allRechazosReq = $http.get(
                APIConfigService.getUrlListaRechazosReq(),
                headers_object
            );
            allRechazosReq.then(function(data){
                $localStorage.listaRechazosReq = data.data;
            }).catch(function(data){
                console.log("Error recuperando los rechazos de requisito: " + data);
            });
        };

        service.getListMotivosCancelacion = function(){
            var allMotivosCancelacion = $http.get(
                APIConfigService.getUrlListaMotivosCancelacion(),
                headers_object
            );
            allMotivosCancelacion.then(function(data){
                $localStorage.listaMotivosCancelacion = data.data;
            }).catch(function(data){
                console.log("Error recuperando los motivos de cancelacion: " + data);
            });
        };

        service.getListTipoDocs = function(){
            var allDocs = $http.get(
                APIConfigService.getUrlListaTipoDocs(),
                headers_object
            );
            allDocs.then(function(data){
                $localStorage.tiposDocs = data.data;
            }).catch(function(data){
                console.log("Error recuperando los tipos de documento: " + data);
            });
        };

        service.getListPaises = function(){
            var allPaises = $http.get(
                APIConfigService.getUrlListaPaises()
            );
            allPaises.then(function(data){
                $localStorage.listaPaises = data.data.data.paises;
            }).catch(function(data){
                console.log("Error recuperando el listado de paises: " + data);
            });
        };

        service.getListCiudades = function(){
            var allCiudades = $http.get(
                APIConfigService.getUrlListaCiudades()
            );
            allCiudades.then(function(data){
                $localStorage.listaCiudades = data.data.data.ciudad;
            }).catch(function(data){
                console.log("Error recuperando el listado de ciudades: " + data);
            });
        };

        service.getListTipoVias = function(){
            var allTipoVias = $http.get(
                APIConfigService.getUrlListaTipoVias()
            );
            allTipoVias.then(function(data){
                $localStorage.listaTipoVias = data.data.data.tipoVia;
            }).catch(function(data){
                console.log("Error recuperando el listado de tipo de vias: " + data);
            });
        };

        service.getListPrefiltros = function(){
            $localStorage.tiposPreFiltros = {
                pteValidacion : 'pendienteValidacion',
                pteDocumentacion : 'pendienteDocumentacion',
                fioc : 'fioc',
                pteActivacion : 'pendienteActivacion',
                pteCancelacion : 'pendienteCancelacion',
                pteBloqueo: 'pendienteBloquear',
                incidencia: 'incidencia',
                avisos: 'avisos'
            };
        };

        service.getListAccount = function(){
            $localStorage.accountInfo = {
                IBAN : 'ES89',
                Entidad : '0073',
                Oficina : '0100'
            };
        };

        service.getListAccionesFioc = function(){
            $localStorage.accionesFioc = {
                noProcesar: 'No Procesar',
                ok: 'Todo Correcto',
                empresaKo: 'Revisar Empresa',
                actividadKo: 'Revisar Actividad',
                ambasKo: 'Revisar Ambas'
            };
        };

        return service;
    }]);
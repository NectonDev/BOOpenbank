angular.module('APIConfig',[])
    .service('APIConfigService', function(){
        var service = this,
        urlApis = {
            apiUrlServicios: 'http://hc-des-procesosi.alphainn.gsnetcloud.com',
            apiUrlExpedientes: 'http://hc-des-expediente.alphainn.gsnetcloud.com'
        },
        endpointmap = {
            login: '/login',
            leerExpedientes: '/leerExpedientes',
            leerExpediente: '/leerExpediente',
            leerExpedientesFiltros: '/leerExpedientesFiltros',
            leerExpedienteBloqueo: '/leerExpedienteBloqueo',
            bloquearExpediente: '/bloquearExpediente',
            desbloquearExpediente: '/desBloquearExpediente',
            leerObservaciones: '/listaObservaciones',
            actualizarRequisito: '/actualizacionRequisito',
            adjuntarDocumento: '/adjuntarDocumento',
            leerDocumentos: '/recuperarDocumentosUsuario',
            cancelarExpediente: '/cancelarExpediente',
            procesadoFioc: '/procesadoFioc',
            listaTipoDocs: '/listaTipoDocs',
            listaEstados: '/listaEstados',
            listaReq: '/listaRequisitos',
            listaEstadosReq: '/listaEstadosRequisitos',
            listaRechazosReq: '/listaRechazoRequisito',
            listaMotivosCancelacion: '/listaMotivosCancelacion',
            listaPaises: '/prPaises/listar/tablas',
            listaTipoVias: '/prTipoVia/listar/TipoVia',
            listaCiudades: '/prCiudad/listar/Tablas'
        },
        headers_object = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        },
        default_parameters_expediente = {
            page: '1',
            results: '5',
            filter: 'pendienteValidacion',
            bloqueo: false
        };

        service.getHeaders = function(){
            return headers_object;
        };
        service.getUrlLogin = function(){
            return urlApis.apiUrlExpedientes+endpointmap.login;
        };
        service.getUrlLeerExpedientes = function(){
            return urlApis.apiUrlExpedientes+endpointmap.leerExpedientes;
        };
        service.getUrlLeerExpediente = function(){
            return urlApis.apiUrlExpedientes+endpointmap.leerExpediente;
        };
        service.getUrlLeerExpedientesFiltros = function(){
            return urlApis.apiUrlExpedientes+endpointmap.leerExpedientesFiltros;
        };
        service.getUrlLeerExpedienteBloqueo = function(){
            return urlApis.apiUrlExpedientes+endpointmap.leerExpedienteBloqueo;
        };
        service.getUrlBloquearExpediente = function(){
            return urlApis.apiUrlExpedientes+endpointmap.bloquearExpediente;
        };
        service.getUrlDesbloquearExpediente = function(){
            return urlApis.apiUrlExpedientes+endpointmap.desbloquearExpediente;
        };
        service.getUrlLeerObservaciones = function(){
            return urlApis.apiUrlExpedientes+endpointmap.leerObservaciones;
        };
        service.getUrlActualizarRequisito = function(){
            return urlApis.apiUrlExpedientes+endpointmap.actualizarRequisito;
        };
        service.getUrlCancelarExpediente = function(){
            return urlApis.apiUrlExpedientes+endpointmap.cancelarExpediente;
        };
        service.getUrlListaMotivosCancelacion = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaMotivosCancelacion;
        };
        service.getUrlListaTipoDocs = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaTipoDocs;
        };
        service.getUrlListaEstados = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaEstados;
        };
        service.getUrlListaReq = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaReq;
        };
        service.getUrlListaEstadosReq = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaEstadosReq;
        };
        service.getUrlListaRechazosReq = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaRechazosReq;
        };
        service.getUrlAdjuntarDocumento = function(){
            return urlApis.apiUrlExpedientes+endpointmap.adjuntarDocumento;
        };
        service.getUrlLeerDocumentos = function(expId,userObjName,tipoDoc){
            return urlApis.apiUrlExpedientes+endpointmap.leerDocumentos+"/"+expId+"/"+userObjName+"/"+tipoDoc;
        };
        service.getUrlProcesadoFioc = function(){
            return urlApis.apiUrlExpedientes+endpointmap.procesadoFioc;
        };
        service.getUrlListaPaises = function(){
            return urlApis.apiUrlServicios+endpointmap.listaPaises;
        };
        service.getUrlListaTipoVias = function(){
            return urlApis.apiUrlServicios+endpointmap.listaTipoVias;
        };
        service.getUrlListaCiudades = function(){
            return urlApis.apiUrlServicios+endpointmap.listaCiudades;
        };
        service.getDefaultPageExpediente = function(){
            return default_parameters_expediente.page;
        };
        service.getDefaultPageSizeExpediente = function(){
            return default_parameters_expediente.results;
        };
        service.getDefaultFilterExpediente = function(){
            return default_parameters_expediente.filter;
        };
        service.getDefaultBloqueoExpediente = function(){
            return default_parameters_expediente.bloqueo;
        };
    });
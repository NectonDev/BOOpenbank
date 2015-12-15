angular.module('APIConfig',[])
    .service('APIConfigService', function(){
        var service = this,
        urlApis = {
            apiUrlExpedientes: 'https://hc-des-expediente.paas.openbank.es'
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
            pteCancelarExpediente: '/pdtCancelarExpediente',
            procesadoFioc: '/procesadoFioc',
            bloquearCuenta: '/bloquearCuenta',
            listaTipoDocs: '/listaTipoDocs',
            listaEstados: '/listaEstados',
            listaReq: '/listaRequisitos',
            listaEstadosReq: '/listaEstadosRequisitos',
            listaRechazosReq: '/listaRechazoRequisito',
            listaMotivosCancelacion: '/listaMotivosCancelacion',
            listaPaises: '/prPaises/listar/tablas',
            listaTipoVias: '/prTipoVia/listar/TipoVia',
            listaCiudades: '/prCiudad/listar/Tablas',
            listaAvisos: '/listaAvisos ',
            listaAvisosGestor: '/listaAvisosGestor ',
            listaAvisosHistorico: '/listaAvisosHistorico'
        },
        headers_object = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        },
        default_parameters_expediente_bo = {
            page: '1',
            results: '5',
            filter: 'pendienteValidacion',
            bloqueo: false
        },
        default_parameters_expediente_cc = {
            page: '1',
            results: '5',
            filter: 'incidencia',
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
        service.getUrlPteCancelarExpediente = function(){
            return urlApis.apiUrlExpedientes+endpointmap.pteCancelarExpediente;
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
        service.getUrlBloquearCuenta = function(){
            return urlApis.apiUrlExpedientes+endpointmap.bloquearCuenta;
        };
        service.getUrlListaPaises = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaPaises;
        };
        service.getUrlListaTipoVias = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaTipoVias;
        };
        service.getUrlListaCiudades = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaCiudades;
        };
        service.getUrlListaAvisos = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaAvisos;
        };
        service.getUrlListaAvisosGestor = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaAvisosGestor;
        };
        service.getUrlListaAvisosHistorico = function(){
            return urlApis.apiUrlExpedientes+endpointmap.listaAvisosHistorico;
        };
        service.getDefaultPageExpediente = function(){
            return default_parameters_expediente_bo.page;
        };
        service.getDefaultPageSizeExpediente = function(){
            return default_parameters_expediente_bo.results;
        };
        service.getDefaultFilterExpedienteBO = function(){
            return default_parameters_expediente_bo.filter;
        };
        service.getDefaultFilterExpedienteCC = function(){
            return default_parameters_expediente_cc.filter;
        };
        service.getDefaultBloqueoExpediente = function(){
            return default_parameters_expediente_bo.bloqueo;
        };
    });
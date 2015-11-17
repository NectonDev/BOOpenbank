angular.module('APIConfig',[])
    .service('APIConfigService', function(){
        var service = this,
        endpointmap = {
            apiUrlServicios: 'http://hc-des-procesosi.alphainn.gsnetcloud.com',
            apiUrlExpedientes: 'http://hc-des-expediente.alphainn.gsnetcloud.com',
            login: '/login',
            leerExpedientes: '/leerExpedientes',
            leerExpediente: '/leerExpediente',
            leerExpedientesFiltros: '/leerExpedientesFiltros',
            leerExpedienteBloqueo: '/leerExpedienteBloqueo',
            bloquearExpediente: '/bloquearExpediente',
            desbloquearExpediente: '/desBloquearExpediente',
            leerObservaciones: '/listaObservaciones',
            actualizarExpediente: '/actualizarExpediente',
            adjuntarDocumento: '/adjuntarDocumento',
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
            return endpointmap.apiUrlExpedientes+endpointmap.login;
        };
        service.getUrlLeerExpedientes = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.leerExpedientes;
        };
        service.getUrlLeerExpediente = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.leerExpediente;
        };
        service.getUrlLeerExpedientesFiltros = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.leerExpedientesFiltros;
        };
        service.getUrlLeerExpedienteBloqueo = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.leerExpedienteBloqueo;
        };
        service.getUrlBloquearExpediente = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.bloquearExpediente;
        };
        service.getUrlDesbloquearExpediente = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.desbloquearExpediente;
        };
        service.getUrlLeerObservaciones = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.leerObservaciones;
        };
        service.getUrlActualizarExpedientes = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.actualizarExpediente;
        };
        service.getUrlCancelarExpediente = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.cancelarExpediente;
        };
        service.getUrlListaMotivosCancelacion = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaMotivosCancelacion;
        };
        service.getUrlListaTipoDocs = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaTipoDocs;
        };
        service.getUrlListaEstados = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaEstados;
        };
        service.getUrlListaReq = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaReq;
        };
        service.getUrlListaEstadosReq = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaEstadosReq;
        };
        service.getUrlListaRechazosReq = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaRechazosReq;
        };
        service.getUrlAdjuntarDocumento = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.adjuntarDocumento;
        };
        service.getUrlListaPaises = function(){
            return endpointmap.apiUrlServicios+endpointmap.listaPaises;
        };
        service.getUrlListaTipoVias = function(){
            return endpointmap.apiUrlServicios+endpointmap.listaTipoVias;
        };
        service.getUrlListaCiudades = function(){
            return endpointmap.apiUrlServicios+endpointmap.listaCiudades;
        };
        service.getUrlProcesadoFioc = function(){
            return endpointmap.apiUrlServicios+endpointmap.procesadoFioc;
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
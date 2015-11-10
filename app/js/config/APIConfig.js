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
            leerObservaciones: '/listaObservaciones ',
            actualizarExpediente: '/actualizarExpediente',
            listaTipoDocs: '/listaTipoDocs',
            listaEstados: '/listaEstados',
            listaRechazosReq: '/listaRechazoRequisito',
            listaMotivosCancelacion: '/listaMotivosCancelacion',
            listaPaises: '/prPaises/listar/tablas',
            listaTipoVias: '/prTipoVia/listar/TipoVia',
            listaCiudades: '/prCiudad/listar/Tablas',
            adjuntarDocumento: '/adjuntarDocumento'
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
        service.getUrlLeerObservaciones = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.leerObservaciones;
        };
        service.getUrlActualizarExpedientes = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.actualizarExpediente;
        };
        service.getUrlListaTipoDocs = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaTipoDocs;
        };
        service.getUrlListaEstados = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaEstados;
        };
        service.getUrlListaRechazosReq = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaRechazosReq;
        };
        service.getUrlListaMotivosCancelacion = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaMotivosCancelacion;
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
        service.getUrlAdjuntarDocumento = function(){
            return endpointmap.apiUrlServicios+endpointmap.adjuntarDocumento;
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
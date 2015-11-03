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
            listaDocs: '/listaTipoDocs',
            listaEstados: '/listaEstados',
            listaPaises: '/prPaises/listar/tablas'
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
        service.getUrlListaDocs = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaDocs;
        };
        service.getUrlListaEstados = function(){
            return endpointmap.apiUrlExpedientes+endpointmap.listaEstados;
        };
        service.getUrlListaPaises = function(){
            return endpointmap.apiUrlServicios+endpointmap.listaPaises;
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
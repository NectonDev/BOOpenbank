angular.module('APIConfig',[])
    .service('APIConfigService', function(){
        var service = this,
        endpointmap = {
            apiUrl: 'http://hc-des-expediente.alphainn.gsnetcloud.com',
            leerExpedientes: '/leerExpedientes',
            leerExpediente: '/leerExpediente',
            leerExpedientesFiltros: '/leerExpedientesFiltros',
            actualizarExpediente: '/actualizarExpediente',
            listaDocs: '/listaTipoDocs',
            listaEstados: '/listaEstados'
        },
        headers_object = {
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
        service.getHeaders = function(){
            return headers_object;
        };
        service.getUrlLeerExpedientes = function(){
            return endpointmap.apiUrl+endpointmap.leerExpedientes;
        };
        service.getUrlLeerExpediente = function(){
            return endpointmap.apiUrl+endpointmap.leerExpediente;
        };
        service.getUrlLeerExpedientesFiltros = function(){
            return endpointmap.apiUrl+endpointmap.leerExpedientesFiltros;
        };
        service.getUrlActualizarExpedientes = function(){
            return endpointmap.apiUrl+endpointmap.actualizarExpediente;
        };
        service.getUrlListaDocs = function(){
            return endpointmap.apiUrl+endpointmap.listaDocs;
        };
        service.getUrlListaEstados = function(){
            return endpointmap.apiUrl+endpointmap.listaEstados;
        };
    })
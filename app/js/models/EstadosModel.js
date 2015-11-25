angular.module('EstadosModel',[])
    .service('EstadosModel', ['$localStorage', function ($localStorage) {
        var service = this;

        service.getEstadoById = function(estadoId){
            var listaEstados = $localStorage.tiposEstados;
            for (var estado in listaEstados){
                if (listaEstados.hasOwnProperty(estado)) {
                    if (estado === estadoId)
                        return listaEstados[estado];
                }
            }
        };

        service.getEstados = function(){
            var estados = [];
            var listaEstados = $localStorage.tiposEstados;
            for (var estado in listaEstados){
                if (listaEstados.hasOwnProperty(estado)) {
                    estados.push(listaEstados[estado]);
                }
            }
            return estados;
        };

        service.getEstadosReq = function(){
            var estados = [];
            var listaEstadosReq = $localStorage.listaReq;
            for (var estado in listaEstadosReq){
                if (listaEstadosReq.hasOwnProperty(estado)) {
                    estados.push(listaEstadosReq[estado]);
                }
            }
            return estados;
        };

        return service;
    }]);
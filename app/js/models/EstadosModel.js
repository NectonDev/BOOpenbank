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
            var listaEstadosReq = $localStorage.listaEstadosReq;
            for (var estado in listaEstadosReq){
                if (listaEstadosReq.hasOwnProperty(estado)) {
                    estados.push(listaEstadosReq[estado][0]);
                }
            }
            return estados;
        };

        service.getEstadosReqById = function(Req){
            var listaEstadosReq = $localStorage.listaEstadosReq;
            for (var estadoReq in listaEstadosReq){
                if (listaEstadosReq.hasOwnProperty(estadoReq) ) {
                    if (estadoReq === Req)
                        return listaEstadosReq[estadoReq][0];
                }
            }
        };

        service.getKeyEstadosReqByValue = function(value){
            var listaEstadoReq = $localStorage.listaEstadosReq;
            for (var prop in listaEstadoReq) {
                if (listaEstadoReq.hasOwnProperty(prop)){
                    if (listaEstadoReq[prop][0]===value)
                        return prop;
                }
            }
        };

        return service;
    }]);
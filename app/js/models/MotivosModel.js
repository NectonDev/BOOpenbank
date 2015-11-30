angular.module('MotivosModel',[])
    .service('MotivosModel', ['$localStorage', function ($localStorage) {
        var service = this;

        service.getMotivoById = function(motivoId){
            var listaMotivos = $localStorage.listaMotivosCancelacion;
            for (var motivo in listaMotivos){
                if (listaMotivos.hasOwnProperty(motivo)) {
                    if (motivo === motivoId)
                        return listaMotivos[motivo];
                }
            }
        };

        service.getMotivos = function(){
            var motivos = [];
            var listaMotivos = $localStorage.listaMotivosCancelacion;
            for (var motivo in listaMotivos){
                if (listaMotivos.hasOwnProperty(motivo)) {
                    motivos.push(listaMotivos[motivo]);
                }
            }
            return motivos;
        };

        service.getMotivosRechazosByReq = function(Req){
            var motivos = [];
            var listaMotivosRechazosReq = $localStorage.listaRechazosReq;
            for (var motivo in listaMotivosRechazosReq){
                if (listaMotivosRechazosReq.hasOwnProperty(motivo)) {
                    if (motivo === Req) {
                        for (var motivoReq in listaMotivosRechazosReq[motivo]) {
                            if (listaMotivosRechazosReq[motivo].hasOwnProperty(motivoReq)) {
                                motivos.push(listaMotivosRechazosReq[motivo][motivoReq]);
                            }
                        }
                    }
                }
            }
            return motivos;
        };

        return service;
    }]);
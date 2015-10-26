angular.module('RequisitosService',[])
    .factory('RequisitosModel', [function () {
        var service = this;

        var listaRequisitos = {
            RE: "warning",
            NR: "NA",
            RV: "check",
            RR: "error",
            RNE: "no_sim"
        };

        service.getRequisitoById = function(reqId){
            for (var estadoReq in listaRequisitos){
                if (listaRequisitos.hasOwnProperty(estadoReq) ) {
                    if (estadoReq === reqId)
                        return listaRequisitos[estadoReq];
                }
            }
        };

        return service;
    }]);
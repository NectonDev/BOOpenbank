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

        service.getInfoSelfie = function(user){
            var infoSelfie = new Object();
            infoSelfie.fotoOk = user.concordancia_foto?listaRequisitos["RV"]:listaRequisitos["RE"];
            infoSelfie.porcAcierto = user.concordancia_pctje;
            infoSelfie.fecha = user.fecha_selfie;
            return infoSelfie;
        }

        return service;
    }]);
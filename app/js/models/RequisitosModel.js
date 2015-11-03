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

        var tiposReq = {
            0: "Documentaci\u00F3n",
            1: "Reconocimiento facial",
            2: "Documentaci\u00F3n subsanaci\u00F3n de contrato",
            3: "Documentaci\u00F3n de actividad profesional",
            4: "Recibo",
            5: "Modelo IC",
            6: "Certificado",
            7: "Fondos",
            8: "Real Decreto 54",
            9: "Tercera Directiva"
        };
        var infoHeader = {
            documentos: "Documentos",
            gestor: "Gestor",
            fechaCreacion: "Fecha Creaci\u00F3n"
        };
        var infoHeaderSelfie = {
            porcentaje: "Porcentaje",
            intentos: "Intentos",
            fechaCreacion: "Fecha Creaci\u00F3n",
            estado: "Estado"
        };
        var infoHeaderTD = {
            estado: "Estado",
            riesgo: "Riesgo",
            empresa: "\u00BFEn que empresa trabajas\u00B3",
            actividad: "\u00BFCu\u00E1l es tu actividad en la empresa\u003F"
        };

        service.getInfoHeader = function(tipoReq){
            if (tipoReq[0]==="1") {
                return infoHeaderSelfie;
            }else{
                if (tipoReq[0]==="9"){
                    return infoHeaderTD;
                }else{
                    return infoHeader;
                }
            }
        };

        service.getTipoConfigReq = function(tipoReq){
            return tiposReq[tipoReq];
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
            var infoSelfie = {};
            infoSelfie.fotoOk = user.concordancia_foto?listaRequisitos["RV"]:listaRequisitos["RE"];
            infoSelfie.porcAcierto = user.concordancia_pctje;
            infoSelfie.fecha = user.fecha_selfie;
            return infoSelfie;
        };

        return service;
    }]);
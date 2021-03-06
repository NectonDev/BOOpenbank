angular.module('RequisitosModel',[])
    .service('RequisitosModel', ['$localStorage', function ($localStorage) {
        var service = this,

        listaRequisitos = {
            RE: "warning",
            NR: "NA",
            RV: "check",
            RR: "clear",
            RNE: "no_sim",
        },
        tiposReq = {
            0: ["Documentaci\u00F3n","DOC","doc"],
            1: ["Reconocimiento facial"],
            2: ["Documentaci\u00F3n subscripci\u00F3n de contrato","DSC","dsc"],
            3: ["Documentaci\u00F3n de actividad profesional","DAAL","daal"],
            4: ["Recibo","Recibo","recibo"],
            5: ["Modelo IC","ModeloIC","ic"],
            6: ["Certificado","CERTI","certif"],
            7: ["Fondos","Fondos","fondos"],
            8: ["Real Decreto 54","RD54","rd54"],
            9: ["Tercera Directiva","3adir"],
        },
        infoHeader = {
            documentos: "Documentos",
            gestor: "Gestor",
            fechaCreacion: "Fecha Creaci\u00F3n"
        },
        infoHeaderSelfie = {
            porcentaje: "Porcentaje",
            intentos: "Intentos",
            fechaCreacion: "Fecha Creaci\u00F3n",
            estado: "Estado"
        },
        infoHeaderTD = {
            riesgo: "Riesgo",
            gestor: "Gestor",
            fechaCreacion: "Fecha Creaci\u00F3n"
        },
        isSelfie, isFondos, isRD, isTD, isDoc, isMPDC = false;

        service.setIsDoc = function(args){
            (args[0]==="0")?isDoc=true:isDoc=false;
        };

        service.getIsDoc = function(){
            return isDoc;
        };

        service.setIsSelfie = function(args){
            (args[0]==="1")?isSelfie=true:isSelfie=false;
        };

        service.getIsSelfie = function(){
            return isSelfie;
        };

        service.setIsFondos = function(args){
            (args[0]==="7")?isFondos=true:isFondos=false;
        };

        service.getIsFondos = function(){
            return isFondos;
        };

        service.setIsRD = function(args){
            (args[0]==="8")?isRD=true:isRD=false;
        };

        service.getIsRD = function(){
            return isRD;
        };

        service.setIsTD = function(args){
            (args[0]==="9")?isTD=true:isTD=false;
        };

        service.getIsTD = function(){
            return isTD;
        };

        service.setIsMPDC = function(args){
            (args[0]==="10")?isMPDC=true:isMPDC=false;
        };

        service.getIsMPDC = function(){
            return isMPDC;
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

        service.getKeyRequisitoByValue = function(value){
            for (var prop in listaRequisitos) {
                if (listaRequisitos.hasOwnProperty(prop)){
                    if (listaRequisitos[prop]===value)
                        return prop;
                }
            }
        };

        service.getDescRequisitoById = function(reqId){
            var listaEstadosReq = $localStorage.listaEstadosReq;
            for (var estadoReq in listaEstadosReq){
                if (listaEstadosReq.hasOwnProperty(estadoReq)){
                    if (estadoReq === reqId)
                        return listaEstadosReq[estadoReq][0];
                }
            }
        };

        service.getFotoOk = function(concordancia_foto){
            return concordancia_foto?listaRequisitos["RV"]:listaRequisitos["RE"];
        };

        return service;
    }]);
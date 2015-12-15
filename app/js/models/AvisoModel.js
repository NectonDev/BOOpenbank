angular.module('AvisoModel',[])
    .service('AvisoModel', ['AvisosService', function (AvisosService) {
        var service = this;
        getConfigObjectAvisosExp = function(expId){
            return {
                "expediente":{
                    "r_object_id": expId
                }
            }
        };
        getConfigObjectAvisosGestor = function(userObjName){
            return {
                "expediente":{
                    "gestor": userObjName
                }
            }

        };
        getConfigObjectAvisosHistorico = function(userObjName){
            return {
                "expediente":{
                    "gestor": userObjName
                }
            }
        };

        service.transformInfoAvisos = function(dataAvisos){
            return dataAvisos;
        };

        service.getAllAvisosByGestor = function(userObjName){
            return AvisosService.getAllAvisosByGestor(getConfigObjectAvisosGestor(userObjName)).then(function(data){
                return service.transformInfoAvisos(data.data);
            });
        };

        return service;
    }]);
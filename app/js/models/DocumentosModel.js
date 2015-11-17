angular.module('DocumentosModel',[])
    .service('DocumentosModel', ['DocumentosService', function (DocumentosService) {
        var service = this;

        getConfigObject = function(userObjName,expId,fileName,fileType,tipoDoc,tipoDocTramit,ReqAsociado,file){
            return {
                "usuarios": [
                    {
                        "usuario": {
                            "object_name": userObjName
                        }
                    }
                ],
                "expediente": {
                    "r_object_id": expId
                },
                "fichero": [{
                    "object": {
                        "name": fileName,
                        "type": fileType,
                        "properties":{
                            "tipo_documental": tipoDoc,
                            "tipo_doc_tramit": tipoDocTramit,
                            "requerimiento_asociado": ReqAsociado
                        }
                    },
                    "content": file
                }]
            }
        };

        service.addDocument = function(userObjName,expId,fileName,fileType,tipoDoc,tipoDocTramit,ReqAsociado,file){
            return DocumentosService.addDocument(getConfigObject(userObjName,expId,fileName,fileType,tipoDoc,tipoDocTramit,ReqAsociado,file)).then(function(data){
                return data;
            });
        };

        /*service.getDocsByExp = function(userObjName,expId,fileName,fileType,tipoDoc,tipoDocTramit,ReqAsociado,file){
            return DocumentosService.getAllDocumentsByExp(getConfigObject(userObjName,expId,fileName,fileType,tipoDoc,tipoDocTramit,ReqAsociado,file)).then(function(data){
                return data;
            });
        };*/

        return service;
    }]);
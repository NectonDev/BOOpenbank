angular.module('DocumentosModel',[])
    .service('DocumentosModel', ['DocumentosService', function (DocumentosService) {
        var service = this;

        var mimeTypes = {
            pdf: "application/pdf",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png"
        };

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

        getMimeTypeFromExtension = function(extension){
            var mimeType = "";
            angular.forEach(mimeTypes,function(value,key){
                if (angular.equals(key,extension)) {
                    mimeType = value;
                }
            });
            return mimeType;
        };

        transformDocInfo = function(tipoUser,dataDocsUser){
            var docInfoUser = {};
            var reExtension = /(?:\.([^.]+))?$/;
            angular.forEach(dataDocsUser.data.fichero,function(value,key){
                var propsFile = value.object.properties;
                docInfoUser[key] = {};
                docInfoUser[key].tipoUser = tipoUser;
                docInfoUser[key].mimeType = getMimeTypeFromExtension(reExtension.exec(propsFile.object_name)[1]);
                docInfoUser[key].content = "data:"+docInfoUser[key].mimeType+";base64,"+value.content;
                docInfoUser[key].nameFile = propsFile.object_name;
                docInfoUser[key].fechaCreacion = propsFile.r_creation_date;
                docInfoUser[key].reqAsociado = propsFile.requerimiento_asociado;
                docInfoUser[key].gestor = propsFile.gestor;
            });
            return docInfoUser;
        };

        service.addDocument = function(userObjName, expId, fileName, fileType, tipoDoc, tipoDocTramit, reqAsociado, file){
            return DocumentosService.addDocument(getConfigObject(userObjName,expId,fileName,fileType,tipoDoc,tipoDocTramit,reqAsociado,file)).then(function(data){
                return data;
            });
        };

        service.getDocsByUser = function(tipoUser, userObjName, expId){
            return DocumentosService.getDocumentsByUser(expId,userObjName).then(function(data){
                return transformDocInfo(tipoUser,data);
            });
        };

        return service;
    }]);
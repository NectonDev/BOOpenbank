angular.module('TipoDocsModel',[])
    .service('TipoDocsModel', ['$localStorage', function ($localStorage) {
        var service = this;

        service.getTipoDocById = function(docId){
            var listaTiposDocs = $localStorage.tiposDocs;
            for (var doc in listaTiposDocs){
                if (listaTiposDocs.hasOwnProperty(doc) ) {
                    if (listaTiposDocs[doc] === docId )
                        return doc;
                }
            }
        };

        service.getTipoDocs = function(){
            var tipoDocs = [];
            var listaTiposDocs = $localStorage.tiposDocs;
            for (var doc in listaTiposDocs){
                if (listaTiposDocs.hasOwnProperty(doc) ) {
                    tipoDocs.push(doc);
                }
            }
            return tipoDocs;
        };

        return service;
    }]);
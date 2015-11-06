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

        return service;
    }]);
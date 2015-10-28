angular.module('TipoDocsService',[])
    .factory('TipoDocsModel', ['$http', '$localStorage', function ($localStorage, $http) {
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
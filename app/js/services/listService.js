angular.module('ListService',[])
    .service('ListService', ['$http', '$localStorage', 'APIConfigService', function ($http, $localStorage, APIConfigService) {
        var service = this;
        var headers_object = APIConfigService.getHeaders();

        service.getListEstados = function(){
            var allEstados = $http.get(
                APIConfigService.getUrlListaEstados(),
                headers_object
            );
            allEstados.then(function(data){
                $localStorage.tiposEstados = data.data;
            }).catch(function(data){
                console.log("Error recuperando los estados: " + data);
            });
        };

        service.getListDocs = function(){
            var allDocs = $http.get(
                APIConfigService.getUrlListaDocs(),
                headers_object
            );
            allDocs.then(function(data){
                $localStorage.tiposDocs = data.data;
            }).catch(function(data){
                console.log("Error recuperando los tipos de documento: " + data);
            });
        };

        service.getListPaises = function(){
            var allPaises = $http.get(
                APIConfigService.getUrlListaPaises()
            );
            allPaises.then(function(data){
                $localStorage.listaPaises = data.data.data.paises;
            }).catch(function(data){
                console.log("Error recuperando el listado de paises: " + data);
            });
        };

        service.getListCiudades = function(){
            var allCiudades = $http.get(
                APIConfigService.getUrlListaCiudades()
            );
            allCiudades.then(function(data){
                $localStorage.listaCiudades = data.data.data.ciudad;
            }).catch(function(data){
                console.log("Error recuperando el listado de ciudades: " + data);
            });
        };

        service.getListTipoVias = function(){
            var allTipoVias = $http.get(
                APIConfigService.getUrlListaTipoVias()
            );
            allTipoVias.then(function(data){
                $localStorage.listaTipoVias = data.data.data.tipoVia;
            }).catch(function(data){
                console.log("Error recuperando el listado de tipo de vias: " + data);
            });
        }

        service.getListPrefiltros = function(){
            $localStorage.tiposPreFiltros = {
                pteValidacion : 'pendienteValidacion',
                pteDocumentacion : 'pendienteDocumentacion',
                fioc : 'fioc',
                pteActivacion : 'pendienteActivacion',
                pteCancelacion : 'pendienteCancelacion'
            };
        };

        service.getListAccount = function(){
            $localStorage.accountInfo = {
                IBAN : 'ES89',
                Entidad : '2229',
                Oficina : '9598'
            };
        }

        return service;
    }]);
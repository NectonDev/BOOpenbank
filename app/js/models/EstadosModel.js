angular.module('EstadosService',[])
    .factory('EstadosModel', ['$http', '$localStorage', function ($localStorage, $http) {
        var service = this;

        service.getEstadoById = function(estadoId){
            var listaEstados = $localStorage.tiposEstados;
            for (var estado in listaEstados){
                if (listaEstados.hasOwnProperty(estado) ) {
                    if (listaEstados[estado] === estadoId )
                        return estado;
                }
            }
        };

        return service;
    }]);
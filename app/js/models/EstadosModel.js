angular.module('EstadosModel',[])
    .service('EstadosModel', ['$localStorage', function ($localStorage) {
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
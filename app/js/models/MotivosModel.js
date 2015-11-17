angular.module('MotivosModel',[])
    .service('MotivosModel', ['$localStorage', function ($localStorage) {
        var service = this;

        service.getMotivoById = function(motivoId){
            var listaMotivos = $localStorage.listaMotivosCancelacion;
            for (var motivo in listaMotivos){
                if (listaMotivos.hasOwnProperty(motivo)) {
                    if (motivo === motivoId)
                        return listaMotivos[motivo];
                }
            }
        };

        service.getMotivos = function(){
            var motivos = [];
            var listaMotivos = $localStorage.listaMotivosCancelacion;
            for (var motivo in listaMotivos){
                if (listaMotivos.hasOwnProperty(motivo)) {
                    motivos.push(listaMotivos[motivo]);
                }
            }
            return motivos;
        };

        return service;
    }]);
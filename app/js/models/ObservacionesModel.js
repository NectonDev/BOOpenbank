angular.module('ObservacionesModel',[])
    .service('ObservacionesModel', ['ObservacionesService', 'EstadosModel', function (ObservacionesService, EstadosModel) {
        var service = this;

        getConfigObjectObsById = function(expId){
            return {
                "expediente": {
                    "r_object_id": expId
                }
            }
        };

        service.getObservacionesByExpId = function(expId){
            return ObservacionesService.getObservacionesByExpId(getConfigObjectObsById(expId)).then(function(data){
                return transformInfoObservaciones(data.data.observaciones);
            });
        };

        transformInfoObservaciones = function(dataObservaciones){
            var observaciones = {};
            for (var i=0;i<dataObservaciones.length;i++){
                observaciones[i]={};
                observaciones[i].fechaAlta = dataObservaciones[i].fecha_observacion;
                observaciones[i].estado = EstadosModel.getEstadoById(dataObservaciones[i].estado_expediente);
                observaciones[i].gestor = dataObservaciones[i].gestor;
                observaciones[i].descripcion = dataObservaciones[i].descripcion;
            }
            return observaciones;
        };

        return service;
    }]);
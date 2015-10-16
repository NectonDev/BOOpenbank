angular.module('ExpedientesService',[])
    .factory('ExpedientesModel', ['$http','APIConfigService', function ($http, APIConfigService) {
        var service = this;

        service.getAllExpedientes = function(){
            return {
                expedientes: [{
                    locked: 'lock',
                    numCuenta: '1234245890',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: 'Pedro Blanco',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '1234564432',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '5643237890',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: 'lock',
                    numCuenta: '7555543789',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: 'Blanca Iba\u00F1ez',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '4343567890',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '1223221890',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '1234584880',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '1234584880',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: '',
                    numCuenta: '1334284880',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: '',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                },{
                    locked: 'lock',
                    numCuenta: '1234284589',
                    canal: 'M\u00F3vil',
                    interv: '1',
                    gestor: 'Mar\u00EDa Ordo\u00F1ez',
                    creationDate: '21/07/2015 10:30',
                    modDate: '29/08/2015 14:45'
                }]
            };
            /*var allExpedientes  = $http.post(
                APIConfigService.getUrlLeerExpedientes(),
                {
                    "expediente": { "page" : "1", "results" : "12" }
                },
                {
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            );*/
            allExpedientes.then(function(data){
                return data;
            });
            return allExpedientes;
        };

        service.getExpedienteById = function(expediente_id){
            return $http.post(APIConfigService.getUrlLeerExpediente())
            .then(function(result){
                console.log(result);
            });
        };

        return service;
    }]);
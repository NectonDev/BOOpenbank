angular.module('TipoAppService',[])
    .service('TipoAppService', ['$location', function ($location) {
        var service = this;

        service.tipoApp = function(){
            return $location.path().indexOf("backoffice")>-1?"bo":"cc";
        };

        return service;
    }]);
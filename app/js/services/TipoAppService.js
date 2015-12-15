angular.module('TipoAppService',[])
    .service('TipoAppService', ['$location', function ($location) {
        var service = this;

        service.tipoApp = function(){
            return $location.path().indexOf("backoffice")>-1?"bo":"cc";
        };

        service.isBO = function(){
            return $location.path().indexOf("backoffice")>-1;
        };

        service.isCC = function(){
            return $location.path().indexOf("contactcenter")>-1
        };

        return service;
    }]);
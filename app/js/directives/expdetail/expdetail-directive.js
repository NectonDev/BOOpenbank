'use strict';

angular.module('expDetailDirective', [])
    .controller('ExpDetailController', ['$scope', '$routeParams', '$location', '$sessionStorage', 'ExpedientesModel', 'ExpedientesService', 'UsersModel', 'LoginService', function($scope, $routeParams, $location, $sessionStorage, ExpedientesModel, ExpedientesService, UsersModel, LoginService) {
        //TODO: Rehacer con el servicio nuevo de expediente bloqueado
        LoginService.secureUrl();
        var expId = $routeParams.expId;
        ExpedientesModel.isExpLocked(expId).then(function(data){
            var usuario_bloqueo = data;
            if (usuario_bloqueo === ""){
                ExpedientesService.lockExpediente(ExpedientesModel.getConfigObjectLockExp($sessionStorage.infoUser.usuario,$routeParams.expId)).then(function(){
                    ExpedientesModel.getExpedienteById($routeParams.expId).then(function(data){
                        $scope.$on('$locationChangeStart', function(){
                            if ($location.$$path === "/backoffice") {
                                ExpedientesService.unlockExpediente(ExpedientesModel.getConfigObjectLockExp("",$routeParams.expId));
                            }
                        });
                        $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data[0]));
                        $scope.$broadcast('usersReqInfo', UsersModel.transformInfoUsers(data[1]));
                    });
                });
            }else{
                if (usuario_bloqueo===$sessionStorage.infoUser.usuario){
                    ExpedientesModel.getExpedienteById($routeParams.expId).then(function(data){
                        $scope.$on('$locationChangeStart', function(){
                            if ($location.$$path === "/backoffice") {
                                ExpedientesService.unlockExpediente(ExpedientesModel.getConfigObjectLockExp("",$routeParams.expId));
                            }
                        });
                        $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data[0]));
                        $scope.$broadcast('usersReqInfo', UsersModel.transformInfoUsers(data[1]));
                    });
                }else{
                    ExpedientesModel.getExpedienteById($routeParams.expId).then(function(data){
                        $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data[0]));
                        $scope.$broadcast('usersReqInfo', UsersModel.transformInfoUsers(data[1]));
                    });
                }
            }
        });

    }])
    .directive('expDetail', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/templates/expdetail.html',
        transclude: true,
        replace: true,
        scope: {
            expInfo: "=",
            usersInfo: "="
        },
        link: function(){
            $("#backButtonDetail").on('click', function() {
                window.history.back();
            });
        }
    };
});
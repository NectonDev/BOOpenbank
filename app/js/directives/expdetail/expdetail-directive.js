'use strict';

angular.module('expDetailDirective', ['ngAnimate'])
    .controller('ExpDetailController', ['$scope', '$routeParams', 'ExpedientesModel', 'UsersModel', 'LoginService', function($scope, $routeParams, ExpedientesModel, UsersModel, LoginService) {
        LoginService.secureUrl();
        ExpedientesModel.getExpedienteById($routeParams.expId).then(function(data){
            $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data[0]));
            $scope.$broadcast('usersReqInfo', UsersModel.transformInfoUsers(data[1]));
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
        }
    };
});
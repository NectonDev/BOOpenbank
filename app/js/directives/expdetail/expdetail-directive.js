'use strict';

angular.module('expDetailDirective', ['ngAnimate'])
    .controller('ExpDetailController', ['$scope', '$routeParams', 'ExpedientesModel', 'UsersModel', 'LoginModel', function($scope, $routeParams, ExpedientesModel, UsersModel, LoginModel) {
        LoginModel.secureUrl();
        var callToExpById = ExpedientesModel.getExpedienteById($routeParams.expId);
        callToExpById.then(function (data) {
            $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(data.data.expediente));
            $scope.$broadcast('usersReqInfo', UsersModel.transformInfoUsers(data.data.usuarios));
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
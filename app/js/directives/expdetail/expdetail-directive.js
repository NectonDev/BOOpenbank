'use strict';

angular.module('expDetailDirective', ['ngAnimate'])
    .controller('ExpDetailController', ['$scope', '$routeParams', 'ExpedientesModel', 'UsersModel', 'LoginModel', function($scope, $routeParams, ExpedientesModel, UsersModel,LoginModel) {
        LoginModel.secureUrl();
        var expInfo = ExpedientesModel.getExpedienteById($routeParams.expId);
        $scope.$broadcast('expInfo', ExpedientesModel.transformInfoExpediente(expInfo[0]));
        $scope.$broadcast('usersReqInfo', UsersModel.transformInfoUsers(expInfo[1]));

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
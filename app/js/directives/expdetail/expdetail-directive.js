'use strict';

angular.module('expDetailDirective', [])
    .controller('ExpDetailController', ['$scope', '$routeParams', 'ExpedientesModel', function($scope, $routeParams, ExpedientesModel) {
        $scope.expID = $routeParams.expId;
        console.log($scope);
    }])
    .directive('expDetail', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/templates/expdetail.html',
        transclude: true,
        replace: true,
        scope: {
            expId: "="
        }
    };
});
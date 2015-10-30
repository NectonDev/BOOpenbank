'use strict';

angular.module('infoReqUserDirective', [])
    .controller('infoReqUserController', ['$scope', function($scope) {
        $scope.title = "Holaaa";

        $scope.$watch('$scope.fileToUpload',function(data){
            console.log(data);
        });
    }])
    .directive('infoReqUserDetail', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/infoReqUser/templates/infoReqUser.html',
        transclude: true,
        replace: true,
        scope: {
            title: "=",
            fileToUpload: "="
        }
    };
});
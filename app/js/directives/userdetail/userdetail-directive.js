'use strict';

angular.module('userDetailDirective', [])
    .controller('UserDetailController', ['$scope', '$routeParams' ,'UsersModel', 'LoginService', function($scope, $routeParams, UsersModel, LoginService) {
        LoginService.secureUrl();
        var expId = $routeParams.expId;
        var userId = $routeParams.userId;
        UsersModel.getInfoUserById(expId,userId).then(function(data){
            $scope.userInfo = UsersModel.transformDataUser(data);
        });
    }])
    .directive('userDetail', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/userdetail/templates/userdetail.html',
        transclude: true,
        replace: true,
        scope: {
            userInfo: "="
        },
        link: function(){
            $("#backButton").on('click', function() {
                window.history.back();
            });
        }
    };
});
'use strict';

angular.module('userDetailDirective', [])
    .controller('UserDetailController', ['$scope', '$routeParams' ,'UsersModel', 'LoginModel', function($scope, $routeParams, UsersModel, LoginModel) {
        LoginModel.secureUrl();
        var expId = $routeParams.expId;
        var userId = $routeParams.userId;
        var userInfo = UsersModel.getInfoUserById(expId,userId);

        userInfo.then(function (data) {
            $scope.userInfo = UsersModel.transformInfoUsers(data.data.usuarios);
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
'use strict';

angular.module('userDetailDirective', [])
    .controller('UserDetailController', ['$scope', '$routeParams' ,'UsersModel', function($scope, $routeParams, UsersModel) {
        var expId = $routeParams.expId;
        var userId = $routeParams.userId;
        var userInfo = UsersModel.getInfoUserById(expId,userId);
        userInfo.then(function (data) {
            for (var i=0;i<data.data.usuarios.length;i++){
                if (data.data.usuarios[i].usuario.r_object_id === userId){
                    $scope.userInfo = UsersModel(data.data.usuarios[i].usuario);
                }
            }
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
        }
    };
});
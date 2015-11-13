'use strict';

angular.module('mpdcDirective', [])
    .controller('MpdcController', ['$scope', '$routeParams', 'LiteralsConfigService', 'UsersModel', function($scope, $routeParams, LiteralsConfigService, UsersModel) {
        $scope.literalHeader = LiteralsConfigService.getMpdcInfo();
        UsersModel.getInfoUserById($routeParams.expId, $routeParams.userId).then(function(data){
            $scope.infoUser = data.data.usuarios[0].usuario;
        });
        $scope.infoUserBDP = LiteralsConfigService.getMpdcInfo();
    }])
    .directive('mpdc', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/mpdc/templates/mpdc.html',
            replace: true,
            scope: {
                literalHeader: "=",
                infoUser: "=",
                infoUserBdp: "="
            }
        };
    });
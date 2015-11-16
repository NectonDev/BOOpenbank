'use strict';

angular.module('mpdcDirective', [])
    .controller('MpdcController', ['$scope', '$routeParams', '$location', 'LiteralsConfigService', 'ExpedientesService', 'UsersModel', 'ExpedientesModel', function($scope, $routeParams, $location, LiteralsConfigService, ExpedientesService, UsersModel, ExpedientesModel) {
        $scope.$on('$locationChangeStart', function(){
            if ($location.$$path === "/backoffice") {
                ExpedientesService.unlockExpediente(ExpedientesModel.getConfigObjectLockExp("",$routeParams.expId));
            }
        });
        $scope.literalHeader = LiteralsConfigService.getMpdcInfo();
        UsersModel.getInfoUserById($routeParams.expId, $routeParams.userId).then(function(data){
            $scope.infoUser = UsersModel.transformDataUser(data.data.usuarios[0].usuario);
        });
        $scope.infoUserBDP = LiteralsConfigService.getMpdcInfo();
    }])
    .directive('mpdc', function(){
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
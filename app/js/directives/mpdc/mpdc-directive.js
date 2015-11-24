'use strict';

angular.module('mpdcDirective', [])
    .controller('MpdcController', ['$scope', '$routeParams', '$location', 'LiteralsConfigService', 'ExpedientesService', 'UsersModel', 'ExpedientesModel', 'EstadosModel', function($scope, $routeParams, $location, LiteralsConfigService, ExpedientesService, UsersModel, ExpedientesModel, EstadosModel) {
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
        $scope.statesOptions = {
            choices: EstadosModel.getEstados()
        };
    }])
    .directive('mpdc', function(){
        return {
            restrict: 'E',
            templateUrl: './js/directives/mpdc/templates/mpdc.html',
            replace: true,
            scope: {
                literalHeader: "=",
                infoUser: "=",
                infoUserBdp: "=",
                statesOptions: "="
            },
            link: function(){
                $("#backButton").on('click', function() {
                    window.history.back();
                });
            }
        };
    });
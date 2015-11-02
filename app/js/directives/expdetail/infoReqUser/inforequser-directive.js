'use strict';

angular.module('infoReqUserDirective', [])
    .controller('infoReqUserController', ['$scope', 'RequisitosModel', function($scope, RequisitosModel) {
        $scope.$on('reqToShow', function(event, args){
            $scope.infoHeader = RequisitosModel.getInfoHeader(args);
            $scope.datosReq = {
                title: RequisitosModel.getTipoConfigReq(args)
            }
        });

    }])
    .directive('infoReqUserDetail', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/infoReqUser/templates/infoReqUser.html',
        transclude: true,
        replace: true,
        scope: {
            datosReq: "=",
            infoHeader: "="
        }
    };
});
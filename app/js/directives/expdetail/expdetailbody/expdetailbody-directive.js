'use strict';

angular.module('expDetailBodyDirective', [])
    .controller('ExpDetailBodyController', ['$scope', '$location', '$routeParams', 'RequisitosModel', 'EstadosModel', function($scope, $location, $routeParams, RequisitosModel, EstadosModel) {
        $scope.infoHeader = {
            DOC: "DOC",
            Selfie: "SELFIE",
            DSC: "DSC",
            DAAL: "DAAL",
            Recibo: "RECIBO",
            IC: "IC",
            Certificacion: "CERTIF.",
            Fondos: "FONDOS",
            RD54: "RD54",
            ThirDir: "3ª DIR",
            MDPC: "MPDC"
        };
        $scope.$on('usersReqInfo', function(event, args){
            $scope.infoReqUser = args;
        });
        $scope.getUserDetail = function(userId){
            var urlToUserDetail = "/backoffice/"+$routeParams.expId+"/"+userId;
            $location.path(urlToUserDetail);
        };
        $scope.getStateReq = function(element){
            return EstadosModel.getEstadosReqById(RequisitosModel.getKeyRequisitoByValue(element));
        };
    }])
    .directive('expDetailBody', ['$rootScope', function($rootScope){
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/expdetailbody/templates/expdetailbody.html',
        transclude: true,
        replace: true,
        scope: {
            infoHeader: "=",
            infoReqUser: "=",
            getUserDetail: "=",
            showDetail: "=",
            showInfo: "=",
            getStateReq: "="
        },link: function($scope){
            $scope.showInfo = function(infoToDeploy, userId, userObjName, estadoReq){
                var infoDeployed = $(".desplegable:visible").hasClass(infoToDeploy);
                if ((estadoReq != "NA") && (infoDeployed === false)){
                    $(".desplegable").slideUp(500);
                    $rootScope.$broadcast('reqToShow', [infoToDeploy.match(/\d+/g), userId, userObjName, estadoReq]);
                    $("." + infoToDeploy).slideDown(500);
                }
            }
        }
    };
}]);

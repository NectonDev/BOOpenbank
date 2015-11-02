'use strict';

angular.module('expDetailBodyDirective', [])
    .controller('ExpDetailBodyController', ['$scope', '$location', '$routeParams', 'RequisitosModel',  function($scope, $location, $routeParams, RequisitosModel) {
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
            ThirDir: "3 DIR",
            MDPC: "MPDC"
        };
        $scope.$on('usersReqInfo', function(event, args){
            $scope.infoReqUser = args;
        });
        $scope.getUserDetail = function(userId){
            var urlToUserDetail = "/backoffice/"+$routeParams.expId+"/"+userId;
            $location.path(urlToUserDetail);
        };
        $scope.isSelfie = function(){
            return RequisitosModel.getIsSelfie();
        };
    }])
    .directive('expDetailBody', ['$rootScope', 'RequisitosModel', function($rootScope) {
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
            isSelfie: "="
        },link: function($scope){
            $scope.showInfo = function(infoToDeploy){
                $rootScope.$broadcast('reqToShow', infoToDeploy.match(/\d+/g));
                $(".desplegable").slideUp();
                $("." + infoToDeploy).slideDown();
                /*var notIsDeployable = reqToDeploy[0] === "9" || reqToDeploy[0] === "10"
                if (notIsDeployable){
                    $(".desplegable").slideUp();
                    if (reqToDeploy == "9") {
                        console.log("3 DIR");
                    }else {
                        console.log("MDPC");
                    }
                }else {
                    $(".desplegable").slideUp();
                    $("." + infoToDeploy).slideDown();
                }*/
            }
        }
    };
}]);

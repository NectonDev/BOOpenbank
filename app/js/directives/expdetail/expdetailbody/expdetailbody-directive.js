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
            showInfo: "="
        },link: function($scope){
            $scope.showInfo = function(infoToDeploy,userId){
                console.log(userId);
                $(".desplegable").slideUp(500);
                $rootScope.$broadcast('reqToShow', [infoToDeploy.match(/\d+/g), userId]);
                $("." + infoToDeploy).slideDown(500);
            }
        }
    };
}]);

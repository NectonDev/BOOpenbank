'use strict';

angular.module('infoReqUserDirective', [])
    .controller('infoReqUserController', ['$scope', '$routeParams', '$location', 'RequisitosModel', function($scope, $routeParams, $location, RequisitosModel) {
        $scope.$on('reqToShow', function(event, args){
            RequisitosModel.setIsSelfie(args);
            RequisitosModel.setIsTD(args);
            RequisitosModel.setIsMPDC(args);
            $scope.isSelfie = RequisitosModel.getIsSelfie();
            $scope.isTd = RequisitosModel.getIsTD();
            if (RequisitosModel.getIsMPDC()){
                var urlToMPDC = "/backoffice/"+$routeParams.expId+"/"+$routeParams.userId+"/cuestionario";
                $location.path(urlToMPDC);
            }
            $scope.infoHeader = RequisitosModel.getInfoHeader(args);
            $scope.datosReq = {
                title: RequisitosModel.getTipoConfigReq(args)
            }
            $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
                alert('this is handler for file reader onload event!');
            };
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
            infoHeader: "=",
            isSelfie: "=",
            isTd: "=",
            onLoad: "=",
            closeDesplegable: "="
        }, link: function($scope){
            $scope.closeDesplegable = function(){
                $(".desplegable").slideUp();
            };
        }
    };
});
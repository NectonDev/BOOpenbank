'use strict';

angular.module('infoReqUserDirective', [])
    .controller('infoReqUserController', ['$scope', '$routeParams', '$location', 'RequisitosModel', 'EstadosModel', function($scope, $routeParams, $location, RequisitosModel, EstadosModel) {
        $scope.$on('reqToShow', function(event, args){
            RequisitosModel.setIsSelfie(args[0]);
            RequisitosModel.setIsFondos(args[0]);
            RequisitosModel.setIsRD(args[0]);
            RequisitosModel.setIsTD(args[0]);
            RequisitosModel.setIsMPDC(args[0]);
            $scope.isSelfie = RequisitosModel.getIsSelfie();
            $scope.isFondos = RequisitosModel.getIsFondos();
            $scope.isRd = RequisitosModel.getIsRD();
            $scope.isTd = RequisitosModel.getIsTD();
            if (RequisitosModel.getIsMPDC()){
                var urlToMPDC = "/backoffice/"+$routeParams.expId+"/"+args[1]+"/mpdc";
                $location.path(urlToMPDC);
            }
            $scope.infoHeader = RequisitosModel.getInfoHeader(args[0]);
            $scope.datosReq = {
                title: RequisitosModel.getTipoConfigReq(args[0])
            };
            $scope.statesOptions = {
                choices: EstadosModel.getEstados()
            };
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
            statesOptions: "=",
            infoHeader: "=",
            isSelfie: "=",
            isFondos: "=",
            isRd: "=",
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
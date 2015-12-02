'use strict';

angular.module('infoReqUserDirective', [])
    .controller('infoReqUserController', ['$scope', '$route', '$routeParams', '$location', 'ngDialog', 'RequisitosModel', 'EstadosModel', 'DocumentosModel', 'UsersModel', 'MotivosModel', 'ExpedientesModel', function($scope, $route, $routeParams, $location, ngDialog, RequisitosModel, EstadosModel, DocumentosModel, UsersModel, MotivosModel, ExpedientesModel) {
        $scope.$on('reqToShow', function(event, args){
            RequisitosModel.setIsDoc(args[0]);
            RequisitosModel.setIsSelfie(args[0]);
            RequisitosModel.setIsFondos(args[0]);
            RequisitosModel.setIsRD(args[0]);
            RequisitosModel.setIsTD(args[0]);
            RequisitosModel.setIsMPDC(args[0]);
            $scope.isDoc = RequisitosModel.getIsDoc();
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
                title: RequisitosModel.getTipoConfigReq(args[0])[0],
                estado: RequisitosModel.getDescRequisitoById(RequisitosModel.getKeyRequisitoByValue(args[3]))
            };
            $scope.statesOptions = {
                choices: EstadosModel.getEstadosReq()
            };
            $scope.motivosOptions = {
                choices: MotivosModel.getMotivosRechazosByReq(RequisitosModel.getTipoConfigReq(args[0])[1])
            };
            $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
                DocumentosModel.addDocument(args[2], $routeParams.expId, fileObj.filename, "binary", "dctm_ok_tr_doctramit", "", RequisitosModel.getTipoConfigReq(args[0])[1], fileObj.base64).then(function(data){
                    if (data.data.codResp === 0){
                        //TODO: Meter modal de subda correcta de fichero.
                        console.log("Subida del fichero correcta");
                    }
                });
            };
            $scope.motivoReqCombo = "";
            UsersModel.getInfoSelfieOfUser($routeParams.expId, args[1]).then(function(data){
                $scope.infoReq = data;
            });
            $scope.selectEstado = function(estado){
                $scope.estadoReqCombo = estado;
            };
            $scope.selectMotivo = function(motivo){
                $scope.motivoReqCombo = motivo;
            };
            $scope.numResultsDocs = 0;
            $scope.updateExp = function(comentario){
                var estadoToUpdate = EstadosModel.getKeyEstadoByValue($scope.estadoReqCombo);
                var reqToUpdate = RequisitosModel.getTipoConfigReq(args[0])[2];
                var motivo = $scope.motivoReqCombo==="Otros"?comentario:$scope.motivoReqCombo;
                if (estadoToUpdate === "RR"){
                    if (((motivo !== "") && (motivo != undefined))){
                        ExpedientesModel.updateExp(args[2],reqToUpdate,estadoToUpdate,motivo,$routeParams.expId).then(function(data){
                            $route.reload();
                        });
                    }
                }else{
                    ExpedientesModel.updateExp(args[2],reqToUpdate,estadoToUpdate,null,$routeParams.expId).then(function(data){
                        $route.reload();
                    });
                }
            };
            $scope.openDialog = function(){
                ngDialog.open({
                    template: 'base64Image',
                    className: 'ngdialog-theme-default ngdialog-theme-custom hola',
                    scope: $scope,
                    closeByEscape: true
                });
            };
            $scope.goToCuestionario = function(){
                var urlToTd = "/backoffice/"+$routeParams.expId+"/"+args[1]+"/cuestionario";
                $location.path(urlToTd);
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
            motivosOptions: "=",
            infoHeader: "=",
            isSelfie: "=",
            isFondos: "=",
            isRd: "=",
            isTd: "=",
            isDoc: "=",
            onLoad: "=",
            closeDesplegable: "=",
            infoReq: "=",
            selectEstado: "=",
            selectMotivo: "=",
            estadoReqCombo: "=",
            motivoReqCombo: "=",
            numResultsDocs: "=",
            updateExp: "=",
            openDialog: "=",
            goToCuestionario: "="
        }, link: function($scope){
            $scope.closeDesplegable = function(){
                $(".desplegable").slideUp();
            };
        }
    };
});
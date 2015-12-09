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
            $scope.infoHeader = RequisitosModel.getInfoHeader(args[0]);
            var tipoDoc = $scope.isDoc?"dctm_ok_tr_ident":"dctm_ok_tr_doctramit";
            DocumentosModel.getDocsByUser($scope.$parent.user.dataUser.tipoUser, $scope.$parent.user.dataUser.objName, $routeParams.expId, tipoDoc).then(function(data){
                $scope.filesUser = data;
            });
            if (RequisitosModel.getIsMPDC()){
                var urlToMPDC = "/backoffice/"+$routeParams.expId+"/"+args[1]+"/mpdc";
                $location.path(urlToMPDC);
            }
            $scope.datosReq = {
                title: RequisitosModel.getTipoConfigReq(args[0])[0],
                estado: RequisitosModel.getDescRequisitoById(RequisitosModel.getKeyRequisitoByValue(args[3])),
                reqDeployed: RequisitosModel.getTipoConfigReq(args[0])[2],
                tipoUserReq: $scope.$parent.user.dataUser.tipoUser
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
                        $scope.filesUser = data;
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
            $scope.updateExp = function(comentario){
                var estadoToUpdate = EstadosModel.getKeyEstadosReqByValue($scope.estadoReqCombo);
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
            $scope.openDialog = function(fileToShow){
                $scope.fileToShow = fileToShow;
                ngDialog.open({
                    template: "<div class='ngdialog-message cancelRecordModal col-sm-12'><object data="+$scope.fileToShow.content+" type="+$scope.fileToShow.mimeType+" width='100%' height='100%'></object></div>",
                    plain: true,
                    className: 'ngdialog-theme-default ngdialog-theme-custom',
                    scope: $scope,
                    closeByEscape: true,
                    preCloseCallback: function(){
                        $scope.fileToShow = "";
                    }
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
            updateExp: "=",
            openDialog: "=",
            goToCuestionario: "=",
            filesUser: "=",
            fileToShow: "="
        }, link: function($scope){
            $scope.closeDesplegable = function(){
                $(".desplegable").slideUp();
            };
        }
    };
});
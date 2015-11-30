'use strict';

angular.module('infoReqUserDirective', [])
    .controller('infoReqUserController', ['$scope', '$routeParams', '$location', 'RequisitosModel', 'EstadosModel', 'DocumentosModel', 'UsersModel', 'MotivosModel', function($scope, $routeParams, $location, RequisitosModel, EstadosModel, DocumentosModel, UsersModel, MotivosModel) {
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
            //TODO: Usado de manera provisional hasta que el clave/valor de lista de estado de requisitos este correcto
            //El campo estado debe de llamar a getDescRequisitoById pasandole como parametro lo que tiene ahora.
            //De todas maneras habria que buscar una forma mas eficiente.
            $scope.datosReq = {
                title: RequisitosModel.getTipoConfigReq(args[0])[0],
                estado: RequisitosModel.getDescRequisitoById(RequisitosModel.getKeyRequisitoByValue(args[3]))
            };
            //Preguntar mañana si los estados de requerimiento son iguales que los de expediente
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
            $scope.estadoReqCombo = RequisitosModel.getDescRequisitoById(RequisitosModel.getKeyRequisitoByValue($scope.$parent.user.dataReqUser[RequisitosModel.getTipoConfigReq(args[0])[2]]));
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
            onLoad: "=",
            closeDesplegable: "=",
            infoReq: "=",
            selectEstado: "=",
            selectMotivo: "=",
            estadoReqCombo: "=",
            motivoReqCombo: "=",
            numResultsDocs: "="
        }, link: function($scope){
            $scope.closeDesplegable = function(){
                $(".desplegable").slideUp();
            };
        }
    };
});
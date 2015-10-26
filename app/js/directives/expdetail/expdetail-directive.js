'use strict';

angular.module('expDetailDirective', ['ngAnimate'])
    .controller('ExpDetailController', ['$scope', '$routeParams', 'ExpedientesModel', 'EstadosModel', 'TipoDocsModel', 'RequisitosModel',   function($scope, $routeParams, ExpedientesModel, EstadosModel, TipoDocsModel, RequisitosModel) {

        function getInfoExpediente(dataExpediente) {
            var expInfo = new Object();
            expInfo.num_cuenta = dataExpediente.codigo_cuenta_creada;
            expInfo.estado = EstadosModel.getEstadoById(dataExpediente.estado);
            expInfo.fecha_alta = dataExpediente.r_creation_date.split("T")[0];
            expInfo.fecha_mod = dataExpediente.r_modify_date.split("T")[0];
            return expInfo;
        }

        function getInfoUsers(dataUsers) {
            var expUsers = new Object();
            for (var i=0;i<dataUsers.length;i++){
                var user = dataUsers[i].usuario;
                expUsers["user"+i] = {};
                expUsers["user"+i].nombre = user.docident_nom_val;;
                expUsers["user"+i].ape1 = user.docident_ape1_val;
                expUsers["user"+i].ape2 = user.docident_ape2_val;
                expUsers["user"+i].numDoc = user.docident_num_val;
                expUsers["user"+i].tipoUser = getTypeOfUser(user);
                expUsers["user"+i].tipoDoc = TipoDocsModel.getTipoDocById(user.docident_num_val);
                expUsers["user"+i].thirdDir = RequisitosModel.getRequisitoById(user.req_3adir_estado);
            }
            return expUsers;
        }

        function getTypeOfUser(user){
            if (user.autenticado_titular){
                return "Titular";
            }
            if (user.autorizado){
                return "Autorizado";
            }
            if (user.cotitular){
                return "Cotitular";
            }
        }

        function getEstadoRequisitos(user){
            var estadoReq = {
                thirdDir: RequisitosModel.getRequisitoById(user.req_3adir_estado)
            }
        return estadoReq;
        }

        var callToExpById = ExpedientesModel.getExpedienteById($routeParams.expId);
        callToExpById.then(function (data) {
            var dataExpediente = data.data.expediente;
            var dataUsers = data.data.usuarios;
            $scope.expInfo = getInfoExpediente(dataExpediente);;
            $scope.usersInfo = getInfoUsers(dataUsers);
        });
    }])
    .directive('expDetail', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/templates/expdetail.html',
        transclude: true,
        replace: true,
        scope: {
            expInfo: "=",
            usersInfo: "="
        }
    };
})
    .animation('.slideSelfie', function() {
        var NG_HIDE_CLASS = 'ng-hide';
        return {
            beforeAddClass: function(element, className, done) {
                if(className === NG_HIDE_CLASS) {
                    element.slideUp(done);
                }
            },
            removeClass: function(element, className, done) {
                if(className === NG_HIDE_CLASS) {
                    element.hide().slideDown(done);
                }
            }
        }
    })
    .animation('.slideDAAL', function() {
        var NG_HIDE_CLASS = 'ng-hide';
        return {
            beforeAddClass: function(element, className, done) {
                if(className === NG_HIDE_CLASS) {
                    element.slideUp(done);
                }
            },
            removeClass: function(element, className, done) {
                if(className === NG_HIDE_CLASS) {
                    element.hide().slideDown(done);
                }
            }
        }
    })
;
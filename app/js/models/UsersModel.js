angular.module('UsersService',[])
    .factory('UsersModel', ['$http', 'TipoDocsModel', 'RequisitosModel', 'APIConfigService', function ($http, TipoDocsModel, RequisitosModel, APIConfigService) {
        var service = this;

        getTypeOfUser = function (user){
            if (user.autenticado_titular){
                return "Titular";
            }
            if (user.autorizado){
                return "Autorizado";
            }
            if (user.cotitular){
                return "Cotitular";
            }
        };

        createDataUser = function (user){
            var dataUser = {};
            dataUser.id = user.r_object_id;
            dataUser.nombre = user.docident_nom_val;
            dataUser.ape1 = user.docident_ape1_val;
            dataUser.ape2 = user.docident_ape2_val;
            dataUser.numDoc = user.docident_num_val;
            dataUser.tipoUser = getTypeOfUser(user);
            dataUser.tipoDoc = TipoDocsModel.getTipoDocById(user.docident_num_val);
            dataUser.fechaNac = user.docident_fecha_nac_val;
            dataUser.sexo = user.docident_sexo_val;
            dataUser.nacionalidad = user.docident_nacionalidad_val;
            dataUser.paisNacimiento = user.docident_pais_nac_val;
            dataUser.pais = user.pais_domicilio;
            dataUser.provincia = user.provincia_domicilio;
            dataUser.nombreVia = user.nom_via_val;
            dataUser.numero = user.num_via_val;
            dataUser.codigoPostal = user.codigo_postal_val;
            dataUser.telefonoMovil = user.telefono_ini;
            dataUser.telefonoFijo = user.telefono_fijo;
            dataUser.email = user.email_invitacion;
            return dataUser;
        };

        createInfoReqUser = function (user){
            var reqUser = {};
            reqUser.doc = RequisitosModel.getRequisitoById(user.req_doc_estado);
            reqUser.selfie = RequisitosModel.getInfoSelfie(user).fotoOk;
            reqUser.dsc = RequisitosModel.getRequisitoById(user.req_dsc_estado);
            reqUser.daal = RequisitosModel.getRequisitoById(user.req_daal_estado);
            reqUser.recibo = RequisitosModel.getRequisitoById(user.req_recibo_estado);
            reqUser.ic = RequisitosModel.getRequisitoById(user.req_ic_estado);
            reqUser.certif = RequisitosModel.getRequisitoById(user.req_certif_estado);
            reqUser.fondos = RequisitosModel.getRequisitoById(user.req_fondos_estado);
            reqUser.rd54 = RequisitosModel.getRequisitoById(user.req_rd54_estado);
            reqUser.thirdDir = RequisitosModel.getRequisitoById(user.req_3adir_estado);
            reqUser.mdpc = RequisitosModel.getRequisitoById(user.req_mdpc_estado);
            return reqUser;
        };

        service.transformInfoUsers = function(dataOfUser){
            var expUsers = {};
            for (var i=0;i<dataOfUser.length;i++){
                var user = dataOfUser[i].usuario;
                expUsers["user"+i] = {};
                expUsers["user"+i].dataUser = createDataUser(user);
                expUsers["user"+i].dataReqUser = createInfoReqUser(user);
            }
            return expUsers;
        };

        service.getInfoUserById = function(expId, userId){
            return $http.post(
                APIConfigService.getUrlLeerExpediente(),
                {
                    "usuarios": [
                        {   "usuario": {
                                "r_object_id": userId
                            }
                        }
                    ],
                    "expediente": {
                        "r_object_id": expId
                    }
                },
                {
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            );
        };

        return service;
    }]);
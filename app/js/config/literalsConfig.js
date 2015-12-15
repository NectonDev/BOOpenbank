angular.module('LiteralsConfig',[])
    .service('LiteralsConfigService', ['$localStorage', function($localStorage){
        var service = this,
            tocHeaderButtonsLiterals = {
                pteValidar: 'PTE. VALIDAR',
                pteDoc: 'PTE. DOCUMENTACI\u00D3N',
                pteRevision: 'REVISI\u00D3N FIOC',
                pteActivacion: 'PTE. ACTIVACI\u00D3N',
                pteCancelacion: 'PTE. CANCELACI\u00D3N',
                pteBloqueo: 'PTE. BLOQUEO',
                lstIncidencias: 'LISTADO INCIDENCIAS',
                avisos: 'AVISOS'
            },
            tocBodyLiterals = {
                numCuenta: 'N\u00FAmero cuenta',
                canal: 'Canal',
                interv: 'Interv.',
                gestor: 'Gestor',
                creationDate: 'Fecha Creaci\u00F3n',
                modDate: 'Fecha Modificaci\u00F3n',
                nombre: 'Nombre',
                apellidos: 'Apellidos',
                empresa: 'Empresa',
                actividad: 'Actividad',
                revFioc: 'Revisi\u00F3n Fioc',
                datInterv: 'Datos Intervinientes',
                bloqueado: 'Bloquear',
                cancelar: 'Cancelar',
                motivoCancel: 'Motivo Cancelaci\u00F3n',
                avisos: 'Avisos',
                detalle: 'Detalle'
            },
            accountInfo = {
                IBANText: 'IBAN',
                IBANNumber: '',
                EntidadText: 'Entidad',
                EntidadNumber: $localStorage.accountInfo.Entidad,
                OficinaText: 'Oficina',
                OficinaNumber: $localStorage.accountInfo.Oficina,
                DCText: 'DC'
            },
            mpdcHeader = {
                nombre: 'Nombre',
                primerApe: 'Primer Apellido',
                segundoApe: 'Segundo Apellido',
                TipoDoc: 'Tipo Documento',
                numDoc: 'N\u00FAmero Documento',
                dateNac: 'Fecha de Nacimiento',
                sexo: 'Sexo',
                nacionalidad: 'Nacionalidad',
                tipoVia: 'Tipo de V\u00ECa',
                nombreVia: 'Nombre de la V\u00ECa',
                numero: 'N\u00FAmero',
                piso: 'Piso',
                codPostal: 'C\u00F3digo Postal',
                localidad: 'Localidad',
                provincia: 'Provincia',
                pais: 'Pais',
                mobilePhone: 'T\u00E8lefono M\u00F3vil',
                phone: 'T\u00E8lefono Fijo',
                email: 'E-mail'
            },
            headersExcel = [
                'N\u00FAmero cuenta',
                'Estado Expediente',
                'Canal',
                'N\u00FAmero de intervinientes',
                'Fecha de Alta',
                'Fecha Modificaci\u00F3n'
            ];

        service.getTocHeaderLiterlas = function(){
            return tocHeaderButtonsLiterals;
        };
        service.getTocBodyLiterals = function(){
            return tocBodyLiterals;
        };
        service.getAccountInfo = function(){
            return accountInfo;
        };
        service.getMpdcInfo = function(){
            return mpdcHeader;
        };
        service.getHeadersExcel = function(){
            return headersExcel;
        };
    }]);
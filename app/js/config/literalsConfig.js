angular.module('LiteralsConfig',[])
    .service('LiteralsConfigService', function(){
        var service = this,
            tocHeaderButtonsLiterals = {
                pteValidar: 'PTE. VALIDAR',
                pteDoc: 'PTE. DOCUMENTACI\u00D3N',
                pteRevision: 'REVISI\u00D3N FIOC',
                pteActivacion: 'PTE. ACTIVACI\u00D3N',
                pteCancelacion: 'PTE. CANCELACI\u00D3N',
                pteBloqueo: 'PTE. BLOQUEO'
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
                actividad: 'Actividad'
            },
            searchInfo = {
                IBANText: 'IBAN',
                IBANNumber: 'ES89',
                EntidadText: 'Entidad',
                EntidadNumber: '2229',
                OficinaText: 'Oficina',
                OficinaNumber: '9598',
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
            };

        service.getTocHeaderLiterlas = function(){
            return tocHeaderButtonsLiterals;
        };
        service.getTocBodyLiterals = function(){
            return tocBodyLiterals;
        };
        service.getSearchInfo = function(){
            return searchInfo;
        };
        service.getMpdcInfo = function(){
            return mpdcHeader;
        };
    });
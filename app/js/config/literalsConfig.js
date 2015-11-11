angular.module('LiteralsConfig',[])
    .service('LiteralsConfigService', function(){
        var service = this,
            tocHeaderButtonsLiterals = {
                pteValidar: 'PTE. VALIDAR',
                pteDoc: 'PTE. DOCUMENTACI\u00D3N',
                pteRevision: 'REVISI\u00D3N FIOC',
                pteActivacion: 'PTE. ACTIVACI\u00D3N',
                pteCancelacion: 'PTE. CANCELACI\u00D3N'
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
    });
'use strict';

angular.module('tocBodyDirective', [])
    .controller('TocBodyController', ['$scope', function($scope) {
        $scope.tocbodyInfo = {
            numCuenta: 'N\u00FAmero cuenta',
            canal: 'Canal',
            interv: 'Interv.',
            gestor: 'Gestor',
            creationDate: 'Fecha Creaci\u00F3n',
            modDate: 'Fecha Modificaci\u00F3n'
        };
        $scope.tocbodyContent = {
            expedientes: [{
                locked: 'lock',
                numCuenta: '1234245890',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: 'Pedro Blanco',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '1234564432',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '5643237890',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: 'lock',
                numCuenta: '7555543789',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: 'Blanca Iba\u00F1ez',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '4343567890',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '1223221890',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '1234584880',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '1234584880',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: '',
                numCuenta: '1334284880',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: '',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            },{
                locked: 'lock',
                numCuenta: '1234284589',
                canal: 'M\u00F3vil',
                interv: '1',
                gestor: 'Mar\u00EDa Ordo\u00F1ez',
                creationDate: '21/07/2015 10:30',
                modDate: '29/08/2015 14:45'
            }]
        };
    }])
    .directive('tocBody', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/toc/tocbody/templates/tocbody.html'
    };
});
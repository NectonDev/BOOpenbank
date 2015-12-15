'use strict';

angular.module('searchDirective', [])
    .controller('SearchController', ['$scope', '$localStorage', 'LoginService', 'LiteralsConfigService', 'EstadosModel', 'TipoDocsModel', 'ExpedientesModel', function($scope, $localStorage, LoginService, LiteralsConfigService, EstadosModel, TipoDocsModel, ExpedientesModel) {
        LoginService.secureUrl();
        $scope.tableInfo = LiteralsConfigService.getTocBodyLiterals();
        function getExpedientes(params){
            ExpedientesModel.getExpedientesSearch(params).then(function(data){
                $scope.tableResults = data;
                $scope.exportExcel = ExpedientesModel.createJsonExcel(data.expedientes);
            }).catch(function(data){
                console.log(data);
            });
        };

        $scope.parameters = {};

        $scope.searchInfo = LiteralsConfigService.getAccountInfo();

        $scope.typeOptions = {
            choices: TipoDocsModel.getTipoDocs()
        };
        $scope.statesOptions = {
            choices: EstadosModel.getEstados()
        };
        $scope.canalesOptions = {
            choices: ['Movil']
        };
        $scope.doSearch = function(){
            if (!angular.equals({}, $scope.parameters)){
                getExpedientes($scope.parameters);
            }
        };
        $scope.cleanSearch = function(){
            $scope.parameters = {};
        };
    }])
    .directive('search', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/search/templates/search.html',
            replace: true,
            scope:{
                parameters: "=",
                searchInfo: "=",
                typeOptions: "=",
                statesOptions: "=",
                canalesOptions: "=",
                doSearch: "=",
                cleanSearch: "=",
                tableResults: "=",
                tableInfo: "="
            },
            link: function(){
                $("#backButtonSearch").on('click', function() {
                    window.history.back();
                });
            }
        };
    });
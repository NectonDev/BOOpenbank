'use strict';

angular.module('searchDirective', [])
    .controller('SearchController', ['$scope', '$localStorage', 'LoginService', 'LiteralsConfigService', 'EstadosModel', 'TipoDocsModel', function($scope, $localStorage, LoginService, LiteralsConfigService, EstadosModel, TipoDocsModel) {
        LoginService.secureUrl();

        $scope.parameters = {};

        $scope.searchInfo = LiteralsConfigService.getSearchInfo();

        $scope.typeOptions = {
            choices: TipoDocsModel.getTipoDocs()
        };
        $scope.statesOptions = {
            choices: EstadosModel.getEstados()
        };
        $scope.canalesOptions = {
            choices: ['Movil', 'Web']
        };
        $scope.doSearch = function(){
            console.log($scope.parameters);
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
                cleanSearch: "="
            }
        };
    });
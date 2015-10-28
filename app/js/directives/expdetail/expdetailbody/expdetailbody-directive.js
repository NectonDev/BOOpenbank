'use strict';

angular.module('expDetailBodyDirective', [])
    .controller('ExpDetailBodyController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
        $scope.infoHeader = {
            DOC: "DOC",
            Selfie: "SELFIE",
            DSC: "DSC",
            DAAL: "DAAL",
            Recibo: "RECIBO",
            IC: "IC",
            Certificacion: "CERTIF.",
            Fondos: "FONDOS",
            RD54: "RD54",
            ThirDir: "3 DIR",
            MDPC: "MPDC"
        };
        $scope.$on('usersReqInfo', function(event, args){
            $scope.infoReqUser = args;
        });
        $scope.getUserDetail = function(userId){
            var urlToUserDetail = "/backoffice/"+$routeParams.expId+"/"+userId
            $location.path(urlToUserDetail);
        }
    }])
    .directive('expDetailBody', function() {
    return {
        restrict: 'E',
        templateUrl: './js/directives/expdetail/expdetailbody/templates/expdetailbody.html',
        transclude: true,
        replace: true,
        scope: {
            infoHeader: "=",
            infoReqUser: "=",
            getUserDetail: "="
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
    });

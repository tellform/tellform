'use strict';

angular.module('forms').directive('onFinishRender', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            // $rootScope.$broadcast(' Started');

            //Don't do anything if we don't have a ng-repeat on the current element
            if(!element.attr('ng-repeat')){
                return;
            }

            var broadcastMessage = attrs.onFinishRender || 'ngRepeat';

            if(scope.$first && !scope.$last) {
                scope.$evalAsync(function () {
                    // console.log(Date.now());
                    $rootScope.$broadcast(broadcastMessage+' Started');
                });
            }else if(scope.$last) {
            	scope.$evalAsync(function () {
                    // element.ready(function () {
                        console.log(broadcastMessage+'Finished');
                        // console.log(Date.now());
                	    $rootScope.$broadcast(broadcastMessage+' Finished');
                    // });
                });
            }
        }
    };
});

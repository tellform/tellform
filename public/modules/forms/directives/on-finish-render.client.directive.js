'use strict';

angular.module('forms').directive('onFinishRender', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            //Don't do anything if we don't have a ng-repeat on the current element
            if(!element.attr('ng-repeat')){
                return;
            }

            var broadcastMessage = attrs.onFinishRender || 'ngRepeat';
             
            if(!scope.$last) {
                $timeout(function () {
                    // console.log(broadcastMessage+'Started');
                    $rootScope.$broadcast(broadcastMessage+'Started');
                });
            }else if(scope.$last) {
            	$timeout(function () {
                    element.ready(function () {
                        // console.log(broadcastMessage+'Finished');
                	    $rootScope.$broadcast(broadcastMessage+'Finished');
                    });
                });
            }
        }
    };
});

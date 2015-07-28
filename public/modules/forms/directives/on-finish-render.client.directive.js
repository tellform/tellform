'use strict';

angular.module('forms').directive('onFinishRender', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$first === true) {
                $timeout(function () {
                    $rootScope.$broadcast('ngRepeatStarted');
                });
            }
            if (scope.$last === true) {
                console.log(element);
            	$timeout(function () {
            		console.log('ngRepeatFinished')
                	$rootScope.$broadcast('ngRepeatFinished');
                });
            }
        }
    };
});

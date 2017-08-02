'use strict';

angular.module('view-form').directive('keyToTruthy', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		scope: {
			field: '=',
            nextField: '&'
		},
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {
				var keyCode = event.which || event.keyCode;
				var truthyKeyCode = $attrs.keyCharTruthy.charCodeAt(0) - 32;
				var falseyKeyCode = $attrs.keyCharFalsey.charCodeAt(0) - 32;
				console.log($scope);
                if(keyCode === truthyKeyCode ) {
					event.preventDefault();
					$scope.$apply(function() {
						$scope.field.fieldValue = 'true';
                        if($attrs.onValidKey){
                            $scope.$root.$eval($attrs.onValidKey);
                        }
					});
				}else if(keyCode === falseyKeyCode){
					event.preventDefault();
					$scope.$apply(function() {
						$scope.field.fieldValue = 'false';
					    if($attrs.onValidKey){
                            $scope.$root.$eval($attrs.onValidKey);
                        }   
                    });
				}
			});
		}
	};
}]);


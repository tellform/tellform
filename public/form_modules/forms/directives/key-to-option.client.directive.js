'use strict';

angular.module('view-form').directive('keyToOption', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		scope: {
			field: '='
		},
		link: function($scope, $element, $attrs) {
			$('body').on('keypress', function(event) {
				var keyCode = event.which || event.keyCode;

				var index = -1;
				if(keyCode <= 122 && keyCode >= 97){
					index = keyCode - 97;
				} else if (keyCode <= 90 && keyCode >= 65){
					index = keyCode - 65;
				}

				if ($scope.field._id === $rootScope.getActiveField() && index !== -1 && index < $scope.field.fieldOptions.length) {
					event.preventDefault();
					$scope.$apply(function () {
						$scope.field.fieldValue = $scope.field.fieldOptions[index].option_value;
					});
				}
			});
		}
	};
}]);

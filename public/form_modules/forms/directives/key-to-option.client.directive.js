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
				var index = parseInt(String.fromCharCode(keyCode))-1;

				if (index < $scope.field.fieldOptions.length) {
					event.preventDefault();
					$scope.$apply(function () {
						$scope.field.fieldValue = $scope.field.fieldOptions[index].option_value;
					});
				}

			});
		}
	};
}]);

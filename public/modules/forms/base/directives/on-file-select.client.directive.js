'use strict';

angular.module('forms').directive('onFileSelect', function() {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			var handler = $attrs.onFileSelect;
			var field = $scope.$eval($attrs.currField);

			$element.on('change', function($event) {
				var files = $event.target.files;

				$scope.$apply(function() {
					$scope.$eval(handler, {currField: field, files: files});
				});
			});
		}
	};
});

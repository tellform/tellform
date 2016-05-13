'use strict';

angular.module('forms').directive('onKeyPress', ['$rootScope', function($rootScope){
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$element.bind('keydown keypress', function(event) {
				var keyCode = event.which || event.keyCode;
				if(keyCode === String.fromCharCode($attrs.keyPressChar)) {
					event.preventDefault();
					$rootScope.$apply(function() {
						$rootScope.$eval($attrs.onKeyPress);
					});
				}
			});
		}
	};
}]);

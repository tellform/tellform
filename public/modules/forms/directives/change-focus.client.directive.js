'use strict';

angular.module('forms').directive('changeFocus', function() {
  return {
  	scope:{
		focusDownId: '@',
		focusUpId: '@',
  	},
    link: function(scope, elem, attrs) {
    	// console.log('aoeuaoeuaoeuaou');
    	scope.focusUp = function(){
    		if(!scope.$first) {
    			// console.log('aoeuaoeu');
	        elem[0].previousElementSibling.find('input').focus();
        }
        scope.apply();
    	};
    	scope.focusDown = function(){
    		if(!scope.$last) {
	            elem[0].nextElementSibling.focus();
        }
        scope.apply();
    	};

    	//Bind 'focus-down' click event to given dom element
	    angular.element('#' + scope.focusDownId).bind('click', function() {
	      scope.focusDown();
	    });

    	//Bind 'focus-up' click event to given dom element
	    angular.element('#' + scope.focusUpId).bind('click', function() {
	      scope.focusUp();
	    });
    }
  };
});
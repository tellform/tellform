'use strict';

// Configuring the Forms drop-down menus
angular.module('forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'My Forms', 'forms', '', '/forms', false);
	}
]).run(['$rootScope', '$state', 
	function($rootScope, $state) {
    	$rootScope.$on('$stateChangeStart', function(evt, to, params) {
	      	if (to.redirectTo) {
	       		evt.preventDefault();
	        	$state.go(to.redirectTo, params)
	      	}
	    });
	}
]).filter('secondsToDateTime', [function() {
	return function(seconds) {
		return new Date(0).setSeconds(seconds);
	};
}]).filter('trustSrc', ['$sce', function($sce){
        return function(formUrl){
        	return $sce.trustAsResourceUrl(formUrl);
        };
}]).config(['$provide', function ($provide){
    $provide.decorator('accordionDirective', function($delegate) {
        var directive = $delegate[0];
        directive.replace = true;
        return $delegate;
    });
}]);
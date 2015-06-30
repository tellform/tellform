'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope',
    function($rootScope) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
			// track the state the user wants to go to; authorization service needs this
			$rootScope.toState = toState;
			$rootScope.toStateParams = toStateParams;
			// if the principal is resolved, do an authorization check immediately. otherwise,
			// it'll be done when the state it resolved.
			// if (Principal.isIdentityResolved()) Authorization.authorize();
		});
    }
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
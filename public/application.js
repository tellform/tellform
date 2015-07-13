'use strict';

console.log('hi');

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {

	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;

	    // add previous state property
	    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	    	console.log(fromState);
	        $state.previous = fromState;

	        //Redirect home to listForms if user is authenticated
	        if(toState.name === 'home'){
	        	if($rootScope.authentication.isAuthenticated()){
	        		event.preventDefault(); // stop current execution
            		$state.go('listForms'); // go to login
	        	}
	        }
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
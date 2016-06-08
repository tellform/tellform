'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Permission Constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('APP_PERMISSIONS', {
  viewAdminSettings: 'viewAdminSettings',
  editAdminSettings: 'editAdminSettings',
  editForm: 'editForm',
  viewPrivateForm: 'viewPrivateForm'
});
//User Role constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('USER_ROLES', {
  admin: 'admin',
  normal: 'user',
  superuser: 'superuser'
});
//form url
angular.module(ApplicationConfiguration.applicationModuleName).constant('FORM_URL', '/forms/:formId');

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', '$state', '$stateParams',
    function($rootScope, Auth, $state, $stateParams) {

	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;

	    // add previous state property
	    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        $state.previous = fromState;
	        //console.log('toState: '+toState.name);

			var statesToIgnore = ['home', 'signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];

	        //Redirect to listForms if user is authenticated
        	if(statesToIgnore.indexOf(toState.name) > 0){
        		if(Auth.isAuthenticated()){
        			event.preventDefault(); // stop current execution
        			//console.log('go to forms');
					$state.go('listForms'); // go to listForms page
        		}
        	}
	        //Redirect to 'signup' route if user is not authenticated
        	else if(toState.name !== 'access_denied' && !Auth.isAuthenticated() && toState.name !== 'submitForm'){
        		console.log('go to signup');
        		event.preventDefault(); // stop current execution
        		$state.go('listForms'); // go to listForms page
        	}

	    });

    }
]);

//Page access/authorization logic
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', 'User', 'Authorizer', '$state', '$stateParams',
  function($rootScope, Auth, User, Authorizer, $state, $stateParams) {
		$rootScope.$on('$stateChangeStart', function(event, next) {
			var authenticator, permissions, user;
			permissions = next && next.data && next.data.permissions ? next.data.permissions : null;

			Auth.ensureHasCurrentUser(User);
			user = Auth.currentUser;

		    if(user){
			  	authenticator = new Authorizer(user);
			  	//console.log('access denied: '+!authenticator.canAccess(permissions));
				//console.log(permissions);
			  	if( (permissions != null) ){
					if( !authenticator.canAccess(permissions) ){
						event.preventDefault();
						//console.log('access denied');
						$state.go('access_denied');
					}
				}
			}
		});
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

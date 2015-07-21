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
  viewPrivateForm: 'viewPrivateForm',
});
//User Role constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('USER_ROLES', {
  admin: 'admin',
  normal: 'user',
  superuser: 'superuser',
});

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', '$state', '$stateParams',
    function($rootScope, Auth, $state, $stateParams) {

	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;

	    // add previous state property
	    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        $state.previous = fromState;

	        //Redirect home to listForms if user is authenticated
	        if(toState.name === 'home'){
	        	if(Auth.isAuthenticated()){
	        		event.preventDefault(); // stop current execution
            		$state.go('listForms'); // go to login
	        	}
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

			  // console.log('Permissions');
			  // console.log(permissions);

			  if( (permissions !== null) && !authenticator.canAccess(permissions) ){
			    event.preventDefault();
		    	console.log('access denied')
		      $state.go('access_denied');
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
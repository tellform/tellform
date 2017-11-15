'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/forms');
	}
]);

var statesWithoutAuth = ['signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];
var statesToIgnore = statesWithoutAuth.concat(['', 'home']);

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', '$state', '$stateParams',
	function($rootScope, Auth, $state, $stateParams) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		// add previous state property
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$state.previous = {
				state: fromState,
				params: fromParams
			}
			
			//Redirect to listForms if user is authenticated
			if(statesToIgnore.indexOf(toState.name) > -1){
				if(Auth.isAuthenticated()){
					event.preventDefault(); // stop current execution
					$state.go('listForms'); // go to listForms page
				}
			}
			//Redirect to 'signup' route if user is not authenticated
			else if(toState.name !== 'access_denied' && !Auth.isAuthenticated() && toState.name !== 'submitForm'){
				event.preventDefault(); // stop current execution
				$state.go('listForms'); // go to listForms page
			}
		});

	}
]);

//Page access/authorization logic
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', 'User', 'Authorizer', '$state', '$stateParams',
	function($rootScope, Auth, User, Authorizer, $state, $stateParams) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if(statesWithoutAuth.indexOf(toState.name) === -1){
				Auth.ensureHasCurrentUser(User).then(
					function onSuccess(currentUser){
						if(currentUser){
							var authenticator = new Authorizer(user);
							var permissions = toState && toState.data && toState.data.permissions ? toState.data.permissions : null;

							if( permissions !== null && !authenticator.canAccess(permissions) ){
								event.preventDefault();
								$state.go('access_denied');
							}
						}
					}, 
					function onError(error){
						event.preventDefault();
						$state.go('access_denied');
					}
				);
			} else {
				event.preventDefault();
				$state.go('access_denied');
			}
		});
	}]);
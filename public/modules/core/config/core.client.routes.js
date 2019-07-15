'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/forms');
	}
]);

var statesWithoutAuth = ['access_denied', 'signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$state', '$stateParams',
	function($rootScope, Auth, $state, $stateParams) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		// add previous state property
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$state.previous = {
				state: fromState,
				params: fromParams
			}
		});

	}
]);

//Page access/authorization logic
angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', 'Auth', 'Authorizer', '$state', '$stateParams',
	function($rootScope, Auth, Authorizer, $state, $stateParams) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

			//Only run permissions check if it is an authenticated state
			if(statesWithoutAuth.indexOf(toState.name) > -1){
				Auth.ensureHasCurrentUser().then(
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
			}
		});
	}]);

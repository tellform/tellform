'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider, Authorization) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('restricted', {
		  	'abstract': true,
			resolve: {
				authorize: ['Authorization',
					function(Authorization) {
						return Authorization.authorize();
					}
				]
			}
		});
	}
]);
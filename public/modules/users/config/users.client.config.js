// 'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Principal',
			function($q, $location, Principal) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]).run(function(Permission, Principal) {
		var User = Principal.identity();
		Permission.defineRole('anonymous', function (stateParams) {
	        // If the returned value is *truthy* then the user has the role, otherwise they don't
	        if ( !User || !Principal.isInAnyRole() ) {
	          return true; // Is anonymous
	        }
	        return false;
	    }).defineRole('admin', function (stateParams) {
	        if (Principal.isInRole('admin')) {
	          return true; // Is admin
	        }
	        return false;
	    }).defineRole('user', function (stateParams) {
	        if (Principal.isInRole('user') && !Principal.isInRole('admin') ) {
	          return true; // Is user
	        }
	        return false;
	    });
	});
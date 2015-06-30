// 'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider','$q', '$location', 'Principal',
	function($httpProvider, $q, $location, Principal) {
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
]).config(['Permission', 'Principal',
	function($Permission, Principal) {
		var User = Principal.identity();
		Permission.defineRole('anonymous', function (stateParams) {
	        // If the returned value is *truthy* then the user has the role, otherwise they don't
	        if ( !User || !Principal.isInAnyRole() ) {
	          return true; // Is anonymous
	        }
	        return false;
	    }).defineRole('admin', function (stateParams) {
	        // If the returned value is *truthy* then the user has the role, otherwise they don't
	        if (Principal.isInRole('admin')) {
	          return true; // Is anonymous
	        }
	        return false;
	    }).defineRole('admin', function (stateParams) {
	        // If the returned value is *truthy* then the user has the role, otherwise they don't
	        if (Principal.isInRole('user') && !Principal.isInRole('admin') ) {
	          return true; // Is anonymous
	        }
	        return false;
	    });
	}
]);
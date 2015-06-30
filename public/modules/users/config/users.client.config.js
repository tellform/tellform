'use strict';

// Config HTTP Error Handling
// angular.module('users').config(['$httpProvider',
// 	function($httpProvider) {
// 		// Set the httpProvider "not authorized" interceptor
// 		$httpProvider.interceptors.push(['$q', '$state', 'Principal',
// 			function($q, $location, Principal) {
// 				return {
// 					responseError: function(rejection) {
// 						switch (rejection.status) {
// 							case 401:
// 								// Deauthenticate the global user
								

// 								// Redirect to signin page
// 								$state.go('signin');
// 								break;
// 							case 403:
// 								// Add unauthorized behaviour 
// 								break;
// 						}

// 						return $q.reject(rejection);
// 					}
// 				};
// 			}
// 		]);
// 	}
// ]);
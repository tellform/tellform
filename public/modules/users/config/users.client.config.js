'use strict';

// Config HTTP Error Handling
<<<<<<< HEAD
angular.module('users').config(['$httpProvider', '$state', 'Principal', '$q',
	function($httpProvider, $state, Principal, $q) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$state', 'Principal',
			function($q, $state, Principal) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								// Principal.authenticate(null);

								// Redirect to signin page
								$state.go('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}
=======
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        responseError: function(response) {
          if( $location.path() !== '/users/me' ){

            console.log('intercepted rejection of ', response.config.url, response.status);
            if (response.status === 401) {
              // save the current location so that login can redirect back
              $location.nextAfterLogin = $location.path();
              $location.path('/signin');
            }else if(response.status === 403){
              $location.path('/access_denied');
            }

          }
          return $q.reject(response);
        }
      };
    });
}]);


// Config HTTP Error Handling
// angular.module('users').config(['$httpProvider',
// 	function($httpProvider) {
// 		// Set the httpProvider "not authorized" interceptor
// 		$httpProvider.interceptors.push(['$q', '$location', 'Principal',
// 			function($q, $state, Principal) {
// 				return {
// 					responseSuccess: function(response) {
// 						Principal.identity().then(function(user){
// 							console.log(user);
// 							// $rootScope.user = user;
// 						}, function(error){
// 							console.log("Coudn't get current user. \n ERROR: "+error);
// 						});
						
// 					},
// 					responseError: function(rejection) {
// 						switch (rejection.status) {
// 							case 401:
// 								// Deauthenticate the global user
// 								Principal.authenticate(null);

// 								// Redirect to signin page
// 								$location.path('/signin');
// 								break;
// 							case 403:
// 								// Add unauthorized behaviour 
// 								break;
// 						}
>>>>>>> dev_working

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
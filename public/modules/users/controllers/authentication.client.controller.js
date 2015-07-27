'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth',
	function($scope, $location, $state, $rootScope, User, Auth) {

		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = null;

		// If user is signed in then redirect back home
		if ($scope.authentication.isAuthenticated()) $state.go('home');

	    $scope.signin = function() {
			Auth.currentUser = User.login($scope.credentials).then(
				function(response) {
					Auth.login(response);
					$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

					if($state.previous.name !== 'home' && $state.previous.name !== ''){
						$state.go($state.previous.name);
					}else{
						$state.go('home');
					}
					
				},
				function(error) {
					$rootScope.user = Auth.ensureHasCurrentUser(User);
					$scope.user = $rootScope.user;

					$scope.error = error;
					console.log('loginError: '+error);
				}
			);
	    };

	    $scope.signup = function() {
	        User.signup($scope.credentials).then(
	        function(response) {
	        	console.log('signup-success');
	        	$state.go('signup-success');
	        },
	        function(error) {
	          if(error) {
	            $scope.error = error;
	          }else {
	            console.log('No response received');
	          }
	        }
	      );
	    };

 	}
]);
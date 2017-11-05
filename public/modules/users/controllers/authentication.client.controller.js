'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth', '$translate', '$window',
	function($scope, $location, $state, $rootScope, User, Auth, $translate, $window) {
		
		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = '';
		$scope.forms = {};

		var statesToIgnore = ['', 'home', 'signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];

	    $scope.signin = function() {
	    	if(!$scope.forms.signinForm.$invalid){
				User.login($scope.credentials).then(
					function(response) {
						Auth.login(response);
						$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

						if(statesToIgnore.indexOf($state.previous.state.name) === -1) {
							$state.go($state.previous.state.name, $state.previous.params);
						} else {
							$state.go('listForms');
						}
					},
					function(error) {
						$rootScope.user = Auth.ensureHasCurrentUser(User);
						$scope.user = $rootScope.user;

						$scope.error = error;
						console.error('loginError: '+error);
					}
				);
		}
	    };

	    $scope.signup = function() {
	    	if($scope.credentials === 'admin'){
	    		$scope.error = 'Username cannot be \'admin\'. Please pick another username.';
	    		return;
	    	}

	    	if(!$scope.forms.signupForm.$invalid){
		        User.signup($scope.credentials).then(
			        function(response) {
			        	$state.go('signup-success');
			        },
			        function(error) {
			        	console.error(error);
						if(error) {
							$scope.error = error;
							console.error(error);
						} else {
							console.error('No response received');
						}
			        }
			    );
		    }
	    };

 	}
]);

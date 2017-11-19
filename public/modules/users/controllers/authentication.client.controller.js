'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth', '$translate', '$window',
	function($scope, $location, $state, $rootScope, User, Auth, $translate, $window) {
		
		//This helps us test the controller by allowing tests to inject their own scope variables
		if(!$scope.credentials) $scope.credentials = {};
		if(!$scope.forms) $scope.forms = {};

		$scope.error = '';

		var statesToIgnore = ['', 'home', 'signin', 'resendVerifyEmail', 'verify', 'signup', 'signup-success', 'forgot', 'reset-invalid', 'reset', 'reset-success'];

	    $scope.signin = function() {
	    	if($scope.credentials.hasOwnProperty('username') && $scope.forms.hasOwnProperty('signinForm') && $scope.forms.signinForm.$valid){
				User.login($scope.credentials).then(
					function(currUser) {
						Auth.login(currUser);
						$rootScope.user = $scope.user = currUser;

						if($state.previous && statesToIgnore.indexOf($state.previous.state.name) === -1) {
							$state.go($state.previous.state.name, $state.previous.params);
						} else {
							$state.go('listForms');
						}
					},
					function(error) {
						$scope.error = error;
						console.error('loginError: '+error);
					}
				);
			}
	    };

	    $scope.signup = function() {
	    	//TODO - David : need to put this somewhere more appropriate
	    	if($scope.credentials.username === 'admin'){
	    		$scope.error = 'Username cannot be \'admin\'. Please pick another username.';
	    		return;
	    	}

	    	if($scope.credentials && $scope.forms.hasOwnProperty('signupForm') && $scope.forms.signupForm.$valid){
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

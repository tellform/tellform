'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth', '$translate', '$window',
	function($scope, $location, $state, $rootScope, User, Auth, $translate, $window) {
		$translate.use($window.locale);

		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = '';
		$scope.forms = [];

	    $scope.signin = function() {
	    	console.log($scope.forms.signinForm);
			User.login($scope.credentials).then(
				function(response) {
					Auth.login(response);
					$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

					if($state.previous.name !== 'home' && $state.previous.name !== 'verify' && $state.previous.name !== '') {
						$state.go($state.previous.name);
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
	    };

	    $scope.signup = function() {
	    	if($scope.credentials === 'admin'){
	    		$scope.error = 'Username cannot be \'admin\'. Please pick another username.';
	    		return;
	    	}

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
	    };

 	}
]);

'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$rootScope', 'User', 'Auth', '$stateParams',
	function($scope, $state, $rootScope, User, Auth, $stateParams) {
		if($rootScope.authetication.isAuthenticated){
			$state.go('home');
		}

		$scope.isReset = false;

		// Submit forgotten password account id
		$scope.resendVerifyEmail = function() {
			User.resendVerifyEmail($scope.email).then(
				function(response){
					$scope.success = response.message;
					$scope.credentials = null;
				},
				function(error){
					$scope.error = error;
					$scope.credentials = null;
				}
			);
		};

		//Validate Verification Token
		$scope.validateVerifyToken = function() {
			if($stateParams.token){
				console.log($stateParams.token);
				User.validateVerifyToken($stateParams.token).then(
					function(response){
						console.log('Success: '+response.message);
						$scope.success = response.message;
						$scope.isReset = true;
						$scope.credentials = null;
					},
					function(error){
						console.log('Error: '+error.message);
						$scope.isReset = false;
						$scope.error = error;
						$scope.credentials = null;
					}
				);
			}
		}
	}
]);
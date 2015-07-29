'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$rootScope', 'User', 'Auth', '$stateParams',
	function($scope, $state, $rootScope, User, Auth, $stateParams) {

		$scope.isReset = false;
		$scope.credentials = {};
		

		// Submit forgotten password account id
		$scope.resendVerifyEmail = function() {
			console.log($scope.credentials.email);
			User.resendVerifyEmail($scope.credentials.email).then(
				function(response){
					$scope.success = response.message;
					$scope.credentials = null;
					$scope.isResetSent = true;
				},
				function(error){
					$scope.error = error;
					$scope.credentials = null;
					$scope.isReset = false;
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
		};
	}
]);
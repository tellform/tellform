'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$rootScope', 'User', 'Auth', '$stateParams', '$translate', '$window',
	function($scope, $state, $rootScope, User, Auth, $stateParams, $translate, $window) {
		$scope.isResetSent = false;
		if(!$scope.credentials) $scope.credentials = {};
		$scope.error = '';

		// Submit forgotten password account id
		$scope.resendVerifyEmail = function() {
			if($scope.credentials.hasOwnProperty('email')){
				User.resendVerifyEmail($scope.credentials.email).then(
					function(response){
						$scope.success = response.message;
						$scope.error = null;
						$scope.credentials = null;
						$scope.isResetSent = true;
					},
					function(error){
						$scope.error = error.message || error;
						$scope.success = null;
						$scope.credentials.email = null;
						$scope.isResetSent = false;
					}
				);
			}
		};

		//Validate Verification Token
		$scope.validateVerifyToken = function() {
			if($stateParams.token){
				User.validateVerifyToken($stateParams.token).then(
					function(response){
						$scope.success = response.message;
						$scope.error = null;
						$scope.isResetSent = true;
						$scope.credentials.email = null;
					},
					function(error){
						$scope.isResetSent = false;
						$scope.success = null;
						$scope.error = error;
						$scope.credentials.email = null;
					}
				);
			}
		};
	}
]);
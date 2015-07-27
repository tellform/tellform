'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth',
	function($scope, $location, $state, $rootScope, User, Auth) {

		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = null;
		$scope.success = null;

		// If user is signed in then redirect back home
		if ($scope.authentication.isAuthenticated()) $state.go('home');

		$scope.validateVerifyToken = function(){
		    $scope.success = $scope.error = null;
			User.validateVerifyToken($stateParams.token).then(
				function(response){
					// If successful show success message and clear form
					$scope.success = response.message;
					$scope.passwordDetails = null;
				},
				function(error){
					$scope.error = error.message || error;
					$scope.passwordDetails = null;
				}
			);
		}


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

 	}
]);
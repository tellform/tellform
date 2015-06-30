'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$state', 'Principal',
	function($scope, $stateParams, $http, $state, Principal) {
		$scope.authentication = Principal;
		$scope.authentication.user = Principal.user();

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $state.go('home');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			Principal.askForPasswordReset($scope.credentials).then(
				function(response){
					$scope.success = response.message
					$scope.credentials = null;
				},
				function(error){
					$scope.error = error;
					$scope.credentials = null;
				}
			);
		};

		// Change user password
		$scope.resetUserPassword = function() {
			Principal.askForPasswordReset($scope.credentials).then(
				function(response){
					$scope.credentials = null;
				},
				function(error){
					$scope.error = error;
					$scope.credentials = null;
				}
			);
			// $scope.success = $scope.error = null;

			// $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
			// 	// If successful show success message and clear form
			// 	$scope.passwordDetails = null;

			// 	// Attach user profile
			// 	// Principal.user() = response;

			// 	// And redirect to the index page
			// 	$state.go('reset-success');
			// }).error(function(response) {
			// 	$scope.error = response.message;
			// });
		};
	}
]);
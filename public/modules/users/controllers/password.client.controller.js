'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$state', 'User',
	function($scope, $stateParams, $state, User) {

		$scope.error = '';

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.button_clicked = true;
			User.askForPasswordReset($scope.credentials).then(
				function(response){
					$scope.button_clicked = false;
					$scope.success = response.message;
					$scope.credentials = null;
				},
				function(error){
					$scope.button_clicked = false;
					$scope.error = error;
					$scope.credentials = null;
				}
			);
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;
			$scope.button_clicked = true;
			User.resetPassword($scope.passwordDetails, $stateParams.token).then(
				function(response){
					// If successful show success message and clear form
					$scope.button_clicked = false;
					console.log(response);
					$scope.success = response.message;
					$scope.passwordDetails = null;

					// And redirect to the index page
					$state.go('reset-success');
				},
				function(error){
					$scope.button_clicked = false;
					$scope.error = error.message || error;
					$scope.passwordDetails = null;
				}
			);
		};
	}
]);

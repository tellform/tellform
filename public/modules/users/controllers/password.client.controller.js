'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$state', 'User', '$translate', '$window',
	function($scope, $stateParams, $state, User, $translate, $window) {
		$translate.use($window.locale);

		$scope.error = '';
		$scope.forms = {};

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			User.askForPasswordReset($scope.credentials).then(
				function(response){
					$scope.success = response.message;
					$scope.error = null;
					$scope.credentials = null;
				},
				function(error){
					$scope.error = error;
					$scope.success = null;
					$scope.credentials = null;
				}
			);
		};

		// Change user password
		$scope.resetUserPassword = function() {
			if(!$scope.forms.resetPasswordForm.$invalid){
				$scope.success = $scope.error = null;
				User.resetPassword($scope.passwordDetails, $stateParams.token).then(
					function(response){
						// If successful show success message and clear form
						$scope.success = response.message;
						$scope.error = null;
						$scope.passwordDetails = null;

						// And redirect to the index page
						$state.go('reset-success');
					},
					function(error){
						$scope.error = error.message || error;
						$scope.success = null;
						$scope.passwordDetails = null;
					}
				);
			}
		};
	}
]);

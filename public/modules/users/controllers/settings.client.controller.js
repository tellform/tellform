'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$state', 'Users', 'Auth', 'currentUser',
	function($scope, $rootScope, $http, $state, Users, Auth, currentUser) {

		$scope.user = currentUser;

		$scope.cancel = function(){
			$scope.user = currentUser;
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					$scope.error = null;
					$scope.user = response;
				}, function(response) {
					$scope.success = null;
					$scope.error = response.data.message;
				});
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).then(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.error = null;
				$scope.passwordDetails = null;
			}, function(response) {
				$scope.success = null;
				$scope.error = response.message;
			});
		};

	}
]);

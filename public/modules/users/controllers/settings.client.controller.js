'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$state', 'Users', 'Auth', 'currentUser', 'USERS_URL', '$translate',
	function($scope, $rootScope, $http, $state, Users, Auth, currentUser, USERS_URL, $translate) {

		$scope.user = currentUser;

		$scope.cancel = function(){
			$scope.user = currentUser;
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid && $scope.user) {
				$scope.success = $scope.error = null;

				$http.put(USERS_URL, $scope.user).then(function(response){ 
					$scope.success = true;
					$scope.error = null;
					$scope.user = response.data;

					$translate.use($scope.user.language);
					Auth.update($scope.user);
				}, function(error) {
					$scope.success = null;
					$scope.error = 'Could not update your profile due to an error with the server. Sorry about this!'
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
			}, function(errResponse) {
				$scope.success = null;
				$scope.error = errResponse.message;
			});
		};

	}
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$state', 'Users', 'Auth',
	function($scope, $rootScope, $http, $state, Users, Auth) {

		$scope.user = Auth.currentUser;

		$scope.cancel = function(){
			$scope.user = Auth.currentUser;
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
					$scope.$apply();
				}, function(response) {
					$scope.success = null;
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
	}
]);

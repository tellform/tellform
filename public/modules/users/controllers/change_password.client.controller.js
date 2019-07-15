'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$rootScope', '$http', '$state', 'Users', 'Auth',
	function($scope, $rootScope, $http, $state, Users, Auth) {
		$scope.user = Auth.currentUser;
		console.log($scope.user);

		$scope.cancel = function(){
			$scope.user = Auth.currentUser;
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.error = null;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.success = null;
				$scope.error = response.message;
			});
		};
	}
]);

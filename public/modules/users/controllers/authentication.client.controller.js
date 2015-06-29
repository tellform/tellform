'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Principal', '$state',
	function($scope, $http, $location, Principal, $state) {

		$scope.authentication = Principal;
		// $scope.authentication.user = Principal.getUser();

		// If user is signed in then redirect back home
		if ($scope.authentication.isAuthenticated()) $state.go('home');

		$scope.signup = function() {
			var response_obj = Principal.signup($scope.credentials);
			
			if( angular.isDefined(response_obj.error) ){
				$scope.error = response_obj.error;
			} else{
				$state.go('home');
			}
			// $http.post('/auth/signup', $scope.credentials).success(function(response) {
			// 	// If successful we assign the response to the global user model
			// 	$scope.authentication.user = response;

			// 	// And redirect to the index page
			// 	$location.path('/');
			// }).error(function(response) {
			// 	$scope.error = response.message;
			// });
		};

		$scope.signin = function() {
			console.log('signin');
			var response_obj = Principal.signin($scope.credentials);
			if( angular.isDefined(response_obj.error) ){
				$scope.error = response_obj.error;
				$location.path('/signin');
			} else{
				$location.path('/');
			}
			// $http.post('/auth/signin', $scope.credentials).success(function(response) {
			// 	// If successful we assign the response to the global user model
			// 	$scope.authentication.user = response;

			// 	// And redirect to the index page
			// 	$location.path('/');
			// }).error(function(response) {
			// 	$scope.error = response.message;
			// });
		};
	}
]);
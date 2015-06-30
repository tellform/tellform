'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', 'Principal', '$state',
	function($scope, $location, Principal, $state) {

		$scope.authentication = Principal;

		// If user is signed in then redirect back home
		if ($scope.authentication.isAuthenticated()) $state.go('home');

		$scope.signup = function() {
			Principal.signup($scope.credentials).then(
				function(result){
					$state.go('home');
				},
				function(rejection_reason){
					$scope.error = rejection_reason;
				}
			);
			// $http.post('/auth/signup', $scope.credentials).success(function(response) {
			// 	// If successful we assign the response to the global user model
			// 	$scope.authentication.user = response;
			// 	Principal.authenticate(response);

			// 	// And redirect to the index page
			// 	$location.path('/');
			// }).error(function(response) {
			// 	$scope.error = response.message;
			// });
		};

		$scope.signin = function() {
			console.log('signin');

			Principal.signin($scope.credentials).then(
				function(result){
					$state.go('home');
				},
				function(rejection_reason){
					$scope.error = rejection_reason;
				}
			);
			// var response_obj = Principal.signin($scope.credentials);
			// if( angular.isDefined(response_obj.error) ){
			// 	$scope.error = response_obj.error;
			// 	$location.path('/signin');
			// } else{
			// 	$location.path('/');
			// }
			// $http.post('/auth/signin', $scope.credentials).success(function(response) {
			// 	// If successful we assign the response to the global user model
			// 	$scope.authentication.user = response;
			// 	Principal.authenticate(response);

			// 	// And redirect to the index page
			// 	$location.path('/');
			// }).error(function(response) {
			// 	Principal.authenticate(null);
			// 	$scope.error = response.message;
			// });
		};
	}
]);
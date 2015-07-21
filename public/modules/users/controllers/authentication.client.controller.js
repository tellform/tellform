'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth',
	function($scope, $location, $state, $rootScope, User, Auth) {

	$scope = $rootScope;
	$scope.credentials = {};
	$scope.error = null;

	// If user is signed in then redirect back home
	if ($scope.authentication.isAuthenticated()) $state.go('home');

    $scope.signin = function() {
		Auth.currentUser = User.login($scope.credentials).then(
			function(response) {
				Auth.login(response);
				$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

				if($state.previous.name !== 'home' && $state.previous.name !== ''){
					$state.go($state.previous.name);
				}else{
					$state.go('home');
				}
				
			},
			function(error) {
				$rootScope.user = Auth.ensureHasCurrentUser(User);
				$scope.user = $rootScope.user;

				$scope.error = error;
				console.log('loginError: '+error);
			}
		);
    };

    $scope.signup = function() {
        User.signup($scope.credentials).then(
        function(response) {
        	console.log('signup-success');
        	$state.go('signup-success');
        },
        function(error) {
          if(error) {
            $scope.error = error;
          }else {
            console.log('No response received');
          }
        }
      );
    };


	// 	$scope.signup = function() {
	// 		Principal.signup($scope.credentials).then(
	// 			function(result){
	// 				$state.go('home');
	// 			},
	// 			function(rejection_reason){
	// 				$scope.error = rejection_reason;
	// 			}
	// 		);
	// 		// $http.post('/auth/signup', $scope.credentials).success(function(response) {
	// 		// 	// If successful we assign the response to the global user model
	// 		// 	$scope.authentication.user = response;
	// 		// 	Principal.authenticate(response);

	// 		// 	// And redirect to the index page
	// 		// 	$location.path('/');
	// 		// }).error(function(response) {
	// 		// 	$scope.error = response.message;
	// 		// });
	// 	};

	// 	$scope.signin = function() {
	// 		console.log('signin');

	// 		Principal.signin($scope.credentials).then(
	// 			function(result){
	// 				$state.go('home');
	// 			},
	// 			function(rejection_reason){
	// 				$scope.error = rejection_reason;
	// 			}
	// 		);
	// 		// var response_obj = Principal.signin($scope.credentials);
	// 		// if( angular.isDefined(response_obj.error) ){
	// 		// 	$scope.error = response_obj.error;
	// 		// 	$location.path('/signin');
	// 		// } else{
	// 		// 	$location.path('/');
	// 		// }
	// 		// $http.post('/auth/signin', $scope.credentials).success(function(response) {
	// 		// 	// If successful we assign the response to the global user model
	// 		// 	$scope.authentication.user = response;
	// 		// 	Principal.authenticate(response);

	// 		// 	// And redirect to the index page
	// 		// 	$location.path('/');
	// 		// }).error(function(response) {
	// 		// 	Principal.authenticate(null);
	// 		// 	$scope.error = response.message;
	// 		// });
	// 	};
	// }
 	}
]);
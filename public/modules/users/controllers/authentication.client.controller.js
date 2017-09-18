'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', '$http', 'User', 'Auth',
	function($scope, $location, $state, $rootScope, $http, User, Auth) {

		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = '';
		$scope.button_clicked = false;

		$scope.getAgencies = function() {
			$http.get('/agencies')
				.success(function(response) {
					$scope.agencies = response;
				})
				.error(function(err) {
					console.error(err);
					$scope.error = err.message;
				});
		}

		//Pre-process sign-up form
		  $scope.preProcessForm = function() {
				//Concatenate email name and its domain
				$scope.credentials.email=$scope.credentials.emailName + '@' + $scope.credentials.emailDomain;
				//Combine email as username
				$scope.credentials.username = $scope.credentials.email;
			};

	    $scope.signin = function() {
	    	$scope.credentials.username = $scope.credentials.username.toLowerCase()
			User.login($scope.credentials).then(
				function(response) {
					Auth.login(response);
					$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

					if($state.previous.name !== 'home' && $state.previous.name !== 'verify' && $state.previous.name !== ''){
						$state.go($state.previous.name);
					}else{
						$state.go('listForms');
					}
				},
				function(error) {
					$rootScope.user = Auth.ensureHasCurrentUser(User);
					$scope.user = $rootScope.user;

					$scope.error = error;
					console.error('loginError: '+error);
				}
			);
	    };

	    $scope.signup = function() {
			$scope.credentials.username = $scope.credentials.username.toLowerCase()
			$scope.credentials.email = $scope.credentials.email.toLowerCase()
	  		$scope.button_clicked = true;
	        User.signup($scope.credentials).then(
		        function(response) {
		        	$state.go('signup-success');
		        	$scope.button_clicked = false;
		        },
		        function(error) {
		        	$scope.button_clicked = false;
					if(error) {
						$scope.error = error;
						console.error(error);
					} else {
						console.error('No response received');
					}
		        }
		    );
	    };

 	}
]);

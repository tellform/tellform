'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$rootScope', '$state', 'myForm',
	function($scope, $rootScope, $state, myForm) {
		$scope.authentication = $rootScope.authentication;
		$scope.myform = myForm;

		if(!$scope.myform.isLive){
			// Show navbar if form is not public AND user IS loggedin
			if($scope.authentication.isAuthenticated() && $scope.currentUser()._id === $scpoe.myform.admin._id){
				$scope.hideNav = $rootScope.hideNav = false;
			}
			// Redirect if  form is not public user IS NOT loggedin
			else {
				$scope.hideNav = $rootScope.hideNav = true;
				$state.go('access_denied');
			}
		}else{
			$scope.hideNav = $rootScope.hideNav = true;
		}

	}
]);
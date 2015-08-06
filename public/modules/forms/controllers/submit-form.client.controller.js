'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Forms', 'CurrentForm',
	function($scope, $rootScope, $stateParams, $state, Forms, CurrentForm) {
	

		Forms.get({
			formId: $stateParams.formId
		}).$promise.then(
		//success
		function(form){
			$scope.myform = form;

			// Show navbar if form is not public AND user is loggedin
			if(!$scope.myform.isLive && $rootScope.authentication.isAuthenticated()){
				$rootScope.hideNav = false;
			}else if(!$scope.myform.isLive){
				$state.go('access_denied');
			}
			console.log('$rootScope.hideNav: '+$rootScope.hideNav);
			console.log('$scope.form.isLive: '+$scope.myform.isLive);
		},
		//error
        function( error ){
        	$scope.error = error.message;
        	console.log('ERROR: '+error.message);
        	$state.go('access_denied');
        });

	}
]);
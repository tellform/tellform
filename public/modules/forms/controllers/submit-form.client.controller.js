'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Forms', 'CurrentForm',
	function($scope, $rootScope, $stateParams, $state, Forms, CurrentForm) {

		Forms.get({
			formId: $stateParams.formId
		}).$promise.then(
		//success
		function(form){
			$scope.form = form;

			//Show navbar if form is not public AND user is loggedin
			if(!$scope.form.isLive && $rootScope.authentication.isAuthenticated()){
				$rootScope.hideNav = false;
			}else if(!$scope.form.isLive){
				$state.go('access_denied');
			}else {
				CurrentForm.setForm($scope.form);
			}
			console.log('$rootScope.hideNav: '+$rootScope.hideNav);
			console.log('$scope.form.isLive: '+$scope.form.isLive);
		},
		//error
        function( error ){
        	$scope.error = error.message;
        	console.log('ERROR: '+error.message);
        	$state.go('access_denied');
        });
	}
]);
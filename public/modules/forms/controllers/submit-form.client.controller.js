'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$rootScope', '$stateParams', '$state', 'Forms', 'CurrentForm', 'Auth',
	function($scope, $rootScope, $stateParams, $state, Forms, CurrentForm, Auth) {
		$scope.authentication = Auth;
	
		$scope.initForm = function(){
			Forms.get({
				formId: $stateParams.formId
			}).$promise.then(
				//success
				function(form){
					$scope.myform = form;

					if(!$scope.myform.isLive){
						// Show navbar if form is not public AND user IS loggedin
						if($scope.authentication.isAuthenticated()){
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
				},
				//error
		        function( error ){
		        	$scope.error = error.message;
		        	console.error('ERROR: '+error.message);
		        	$state.go('access_denied');
		        }
	        );
		};

	}
]);
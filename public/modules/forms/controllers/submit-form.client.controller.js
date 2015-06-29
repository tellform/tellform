'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$stateParams', '$state', 'Principal', 'Forms', 'CurrentForm','$http',
	function($scope, $stateParams, $state, Principal, Forms, CurrentForm, $http) {

		// Principal.identity().then(function(user){
  //           $scope.authentication.user = user;
  //       }).then(function(){
		
			$scope.form = Forms.get({
				formId: $stateParams.formId
			});
			CurrentForm.setForm($scope.form);
          

  			// console.log($scope.form);

            
		// });
	}
]);
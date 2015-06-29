'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$scope', '$stateParams', '$state', 'Principal', 'Forms', 'CurrentForm','$http',
	function($scope, $stateParams, $state, Principal, Forms, CurrentForm, $http) {

		// Principal.identity().then(function(user){
  //           $scope.authentication.user = user;
  //       }).then(function(){
		

			// Return all user's Forms
			$scope.find = function() {
				$scope.forms = Forms.query();
			};

			// Find a specific Form
			$scope.findOne = function() {
				$scope.form = Forms.get({
					formId: $stateParams.formId
				});
				CurrentForm.setForm($scope.form);
			};


            // Remove existing Form
            $scope.remove = function(form) {
                if (form) {
                    form.$remove();

                    $http.delete('/forms/'+$scope.form._id).
                    	success(function(data, status, headers){
                        console.log('form deleted successfully');
                        alert('Form deleted..');
                        $state.go('listForms');
                    });

                } else {
                    $scope.form.$remove(function() {
                    	console.log('remove');
                        $state.path('forms');
	                    $http.delete('/forms/'+$scope.form._id).
	                    	success(function(data, status, headers){
	                        console.log('form deleted successfully');
	                        alert('Form deleted..');
	                        $state.go('listForms');
	                    });
                    });
                }
            };

            
		// });
	}
]);
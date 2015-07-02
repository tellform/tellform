'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($scope, $stateParams, $state, Forms, CurrentForm, $http) {

        // view form submissions
        $scope.form = CurrentForm.getForm();
        $scope.submissions = undefined;
        $scope.viewSubmissions = false;


        //show submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;
            if(!$scope.submissions){
                $http.get('/forms/'+$scope.form._id+'/submissions')
                    .success(function(data, status, headers){
                        console.log(data);
                        $scope.submissions = data;
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });            
            } else if(!$scope.submissions.length){
                $http.get('/forms/'+$scope.form._id+'/submissions')
                    .success(function(data, status, headers){
                        $scope.submissions = data;
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });
            }
            console.log($scope.submissions);
        }

        //hide submissions of Form
        $scope.hideSubmissions = function(){
        	$scope.viewSubmissions = false;
        }

		// Return all user's Forms
		$scope.findAll = function() {
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
        $scope.remove = function() {
            console.log('hello');
            var form = CurrentForm.getForm()
            if(!form){
                form = $scope.form
            }
            $http.delete('/forms/'+$scope.form._id)
                .success(function(data, status, headers){
                    console.log('form deleted successfully');
                    alert('Form deleted..');
                    $state.go('listForms');
                }).error(function(error){
                    console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });

        };
	}
]);
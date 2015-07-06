'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {

        // view form submissions
        $scope.form = CurrentForm.getForm();
        $scope.submissions = undefined;
        $scope.viewSubmissions = false;
        $scope.table = {
            masterChecker: true,
            rows: []
        };

        $scope.saveInProgress = false;
        $scope.update = function() {
            if(!$scope.saveInProgress){
                $scope.saveInProgress = true;

                console.log('start update()');

                $http.put('/forms/'+$scope.form._id, {form: $scope.form})
                    .then(function(response){
                        console.log('form updated successfully');
                        console.log('$scope.saveInProgress: '+$scope.saveInProgress);
                        // $rootScope.goToWithId('viewForm', $scope.form._id);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                    }).finally(function() { 
                        $scope.saveInProgress = false; 
                    });
            };
        }

        //Table Functions
        $scope.toggleAllCheckers = function(){
            console.log('toggleAllCheckers');
            for(var i=0; i<$scope.table.rows.length; i++){
                table.rows[i].selected = $scope.table.masterChecker;
            }
        }
        $scope.toggleObjSelection = function($event, description) {
            $event.stopPropagation();
           console.log('checkbox clicked');
       }

       $scope.rowClicked = function(obj) {
           console.log('row clicked');
           obj.selected = !obj.selected;
       };

        //show submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;
            if(!$scope.table.rows.length){
                $http.get('/forms/'+$scope.form._id+'/submissions')
                    .success(function(data, status, headers){
                        console.log(data);
                        $scope.submissions = data;
                        $scope.table.rows = data; 
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });            
            } else if(!$scope.submissions.length){
                $http.get('/forms/'+$scope.form._id+'/submissions')
                    .success(function(data, status, headers){
                        $scope.submissions = data;
                        $scope.table.rows = data;
                        console.log($scope.table.rows);
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });
            }
            console.log($scope.submissions);
        };

        //hide submissions of Form
        $scope.hideSubmissions = function(){
        	$scope.viewSubmissions = false;
        };

		// Return all user's Forms
		$scope.findAll = function() {
			$scope.forms = Forms.query();
            console.log($scope.forms);
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

            var form = CurrentForm.getForm();
            if(!form) form = $scope.form; 
            
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

        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        // Create new Form
        $rootScope.createOrUpdate = function() {
            if($scope.isNewForm){
                // Create new Form object
                var form = new Forms($scope.form);

                $http.post('/forms', {form: $scope.form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                    $scope.form = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', $scope.form._id);
                }).error(function(errorResponse){
                    console.log(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            } else{
                $rootScope.update();
            }
        };

        // $rootScope.saveInProgress = false;

        var saveFinished = function() { 
            $rootScope.saveInProgress = false; 
            console.log('update form');
        };

        // Update existing Form
        $rootScope.update = function() {

            $rootScope.saveInProgress = true;
            console.log('update form');

            $http.put('/forms/'+$scope.form._id, {form: $scope.form})
                .then(function(response){
                    console.log('form updated successfully');
                }).catch(function(response){
                    console.log('Error occured during form UPDATE.\n');
                    console.log(response.data);
                }).finally(function() { 
                    $rootScope.saveInProgress = false; 
                    console.log('update form');
                });
        };

        $rootScope.resetForm = function(){
            $scope.form = Forms.get({
                formId: $stateParams.formId
            });
        }

	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {

        $scope.myform = CurrentForm.getForm();
        $scope.submissions = undefined;
        $scope.viewSubmissions = false;
        $scope.showCreateModal = false;
        $scope.table = {
            masterChecker: true,
            rows: []
        };

        $scope.setForm = function (form) {
            $scope.myForm = form;
        };

        $scope.openCreateModal = function(){
            if(!$scope.showCreateModal){
                $scope.showCreateModal = true;
            }
        };
        $scope.closeCreateModal = function(){
            if($scope.showCreateModal){
                $scope.showCreateModal = false;
            }
        };

        //Create new form
        $scope.createNew = function(){
            var form = {};
            form.title = $scope.myForm.name.$modelValue;
            form.language = $scope.myForm.language.$modelValue;
            console.log(form);
            $scope.showCreateModal = true;

            console.log($scope.myForm);
            if($scope.myForm.$valid && $scope.myForm.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                   $scope.myForm = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', $scope.myform._id);
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    // $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.saveInProgress = false;
        $scope.update = function() {
            if(!$scope.saveInProgress){
                $scope.saveInProgress = true;

                console.log('start update()');

                $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        console.log('form updated successfully');
                        console.log('$scope.saveInProgress: '+$scope.saveInProgress);
                        // $rootScope.goToWithId('viewForm', $scope.myform._id);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                    }).finally(function() { 
                        $scope.saveInProgress = false; 
                    });
            }
        };

        //Table Functions
        $scope.toggleAllCheckers = function(){
            console.log('toggleAllCheckers');
            for(var i=0; i<$scope.table.rows.length; i++){
                $scope.table.rows[i].selected = $scope.table.masterChecker;
            }
        };
        $scope.toggleObjSelection = function($event, description) {
            $event.stopPropagation();
           console.log('checkbox clicked');
       };

       $scope.rowClicked = function(obj) {
           console.log('row clicked');
           obj.selected = !obj.selected;
       };

        //show submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;
            if(!$scope.table.rows.length){
                $http.get('/forms/'+$scope.myform._id+'/submissions')
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
                $http.get('/forms/'+$scope.myform._id+'/submissions')
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
			$scope.myforms = Forms.query();
		};

		// Find a specific Form
		$scope.findOne = function() {
			$scope.myform = Forms.get({
				formId: $stateParams.formId
			});
			CurrentForm.setForm($scope.myform);
		};

        // Remove existing Form
        $scope.remove = function(form_id) {
            var form = {};
            if(!form_id){
                form = CurrentForm.getForm();
                if(!form) form = $scope.myform;
            }else {
                form._id = form_id;
            }

    
            
            $http.delete('/forms/'+form._id)
                .success(function(data, status, headers){
                    console.log('form deleted successfully');

                    if(!form_id){
                        $state.go('listForms');
                    }
                    if($scope.myforms.length > 0){
                        $scope.myforms = _.filter($scope.myforms, function(myform){
                            return myform._id !== form._id; 
                        });
                    }

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
                var form = new Forms($scope.myform);

                $http.post('/forms', {form: $scope.myform})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                    $scope.myform = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', $scope.myform._id);
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

            $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
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
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

	}
]);
'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {

        $scope = $rootScope;
        $scope.myform = CurrentForm.getForm();
        $rootScope.saveInProgress = false;
        $scope.viewSubmissions = false;
        $rootScope.showCreateModal = false;
        $scope.table = {
            masterChecker: false,
            rows: []
        };

        // Return all user's Forms
        $scope.findAll = function() {
            if(!$scope.myforms){
                Forms.query(function(_forms){
                    $scope.myforms = _forms;
                });
            }
        };

        // Find a specific Form
        $scope.findOne = function() {
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
            CurrentForm.setForm($scope.myform);
        };

        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        $scope.setForm = function (form) {
            $scope.myform = form;
        };

        //Modal functions
        $scope.openCreateModal = function(){
            if(!$rootScope.showCreateModal){
                $rootScope.showCreateModal = true;
            }
        };
        $scope.closeCreateModal = function(){
            if($rootScope.showCreateModal){
                $rootScope.showCreateModal = false;
            }
        };

        /*
        * Table Functions
        */
        $scope.isAtLeastOneChecked = function(){
            // console.log('isAtLeastOneChecked');
            for(var i=0; i<$scope.table.rows.length; i++){
                if($scope.table.rows[i].selected) return true;
            }
            return false;
        };
        $scope.toggleAllCheckers = function(){
            // console.log('toggleAllCheckers');
            for(var i=0; i<$scope.table.rows.length; i++){
                $scope.table.rows[i].selected = $scope.table.masterChecker;
            }
        };
        $scope.toggleObjSelection = function($event, description) {
            $event.stopPropagation();
        };
        $scope.rowClicked = function(obj) {
           obj.selected = !obj.selected;
        };

        /*
        * Form Submission Methods
        */
        //Delete selected submissions of Form
        $scope.deleteSelectedSubmissions = function(){
            // console.log('deleteSelectedSubmissions');
            var delete_ids = _.chain($scope.table.rows).filter(function(row){
                return !!row.selected;
            }).pluck('_id').value();
            console.log(delete_ids);

            $http({ url: '/forms/'+$scope.myform._id+'/submissions', 
                    method: 'DELETE',
                    data: {deleted_submissions: delete_ids},
                    headers: {"Content-Type": "application/json;charset=utf-8"}
                }).success(function(data, status, headers){
                    //Remove deleted ids from table
                    for(var i=0; i<$scope.table.rows.length; i++){
                        if($scope.table.rows[i].selected){
                            $scope.table.rows.splice(i, 1);
                        }
                    }
                })
                .error(function(err){
                    console.log('Could not delete form submissions.\nError: ');
                    console.log(err);
                    console.error = err;
                });      
        };
        //Fetch and display submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;

            $http.get('/forms/'+$scope.myform._id+'/submissions')
                .success(function(data, status, headers){
                    // console.log(data[0].form_fields);

                    var _data = [];
                    for(var i=0; i<data.length; i++){

                        var _tmpSubFormFields = JSON.parse(JSON.stringify($scope.myform.form_fields));

                        for(var x=0; x<_tmpSubFormFields.length; x++){

                            var currField__id = _tmpSubFormFields[x]._id,
                                currField;

                            _.find(data[i].form_fields, function(fieldItem, fieldIdx){ 
                                if(fieldItem._id === currField__id){ 
                                    currField = fieldItem; 
                                    // console.log(fieldItem.fieldValue);
                                    return true;
                                }
                            });

                            if(currField !== undefined){
                                _tmpSubFormFields[x].fieldValue = currField.fieldValue;
                                _tmpSubFormFields[x].$$hashKey = currField.$$hashKey;
                            }else {
                                _tmpSubFormFields[x].fieldValue = '';
                            }

                        }

                        _data[i] = data[i];
                        _data[i].form_fields = _tmpSubFormFields;
                    }

                    // console.log(JSON.stringify(_data));
                    $scope.submissions = _data;
                    $scope.table.rows = _data;
                    if(!$scope.$$phase && !$scope.$digest){
                        $scope.$apply();
                    }
                    // console.log('form submissions successfully fetched');
                    // console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
                    // console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );
                })
                .error(function(err){
                    console.log('Could not fetch form submissions.\nError: '+err);
                });            
        };
        //hide submissions of Form
        $scope.hideSubmissions = function(){
        	$scope.viewSubmissions = false;
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

        // Create new Form
        $scope.createNew = function(){
            var form = {};
            form.title = $scope.myform.name.$modelValue;
            form.language = $scope.myform.language.$modelValue;
            console.log(form);
            $rootScope.showCreateModal = true;

            console.log($scope.myform);
            if($scope.myform.$valid && $scope.myform.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                   $scope.myform = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', data._id+'');
                }).error(function(errorResponse){
                    console.log(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
            }
        };


        // Update existing Form
        $scope.update = $rootScope.update = function(cb) {
            if(!$rootScope.saveInProgress && $rootScope.finishedRender){

                $rootScope.saveInProgress = true;
                console.log('begin updating form');
                var err = null;

                $scope.updatePromise = $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        $rootScope.myform = $scope.myform = response.data;
                        console.log(response.data);
                        if(!$scope.$digest){
                            $scope.$apply();
                        }
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        console.log('finished updating');
                        $rootScope.saveInProgress = false;
                        cb(err);
                    });
            }
        };

        $rootScope.resetForm = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

	}
]);
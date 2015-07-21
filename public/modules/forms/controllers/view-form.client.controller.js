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

        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };



        $scope.setForm = function (form) {
            $scope.myForm = form;
        };

        //Modal functions
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

        /*
        * Table Functions
        */
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
           // console.log('row clicked');
           obj.selected = !obj.selected;
        };

        //show submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;

            $http.get('/forms/'+$scope.myform._id+'/submissions')
                .success(function(data, status, headers){
                    console.log(data[0].form_fields);

                    var _data = Array();
                    for(var i=0; i<data.length; i++){

                        var _tmpSubFormFields = JSON.parse(JSON.stringify($scope.myform.form_fields));

                        for(var x=0; x<_tmpSubFormFields.length; x++){

                            var currField__id = _tmpSubFormFields[x]._id,
                                currField = undefined;

                            _.find(data[i].form_fields, function(fieldItem, fieldIdx){ 
                                if(fieldItem._id === currField__id){ 
                                    currField = fieldItem; 
                                    console.log(fieldItem.fieldValue);
                                    return true;
                                }; 
                            });

                            if(currField !== undefined){
                                _tmpSubFormFields[x].fieldValue = currField.fieldValue;
                                _tmpSubFormFields[x].$$hashKey = currField.$$hashKey;
                            }else {
                                _tmpSubFormFields[x].fieldValue = '';
                            }

                        }
                        // _tmpSubFormFields.order = i;

                        _data[i] = data[i];
                        _data[i].form_fields = _tmpSubFormFields;
                    };

                    console.log(JSON.stringify(_data));
                    $scope.submissions = _data;

                    $scope.table.rows = _data;
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

        // Update existing Form
        $scope.saveInProgress = false;
        $scope.update = $rootScope.update = function(cb) {
            if(!$scope.saveInProgress){
                $scope.saveInProgress = true;

                $rootScope.saveInProgress = true;
                // console.log('begin updating form');
                var err = null;

                $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        // console.log('form updated successfully');
                        // console.log(response.status);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        // console.log('finished updating');
                        $scope.saveInProgress = false;
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
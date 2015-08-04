'use strict';

// Forms controller
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http) {
        
        $scope = $rootScope;
        $rootScope.showCreateModal = false;

        // Return all user's Forms
        $scope.findAll = function() {
            Forms.query(function(_forms){
                $scope.myforms = _forms;
            });
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

        $scope.setForm = function (form) {
            $scope.myform = form;
        };
        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
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

        $scope.remove = function(form_id) {

            console.log('Remove existing form');

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
                        $state.go('listForms', {}, {reload: true}); 
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
    }
]);
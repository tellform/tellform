'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$modal', 'myForm',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $modal, myForm) {

        $scope = $rootScope;

        $scope.myform = myForm;
        $rootScope.saveInProgress = false;
        CurrentForm.setForm($scope.myform);

        // console.log($scope.myform);

        // Find a specific Form
        $scope.findOne = function(){
            Forms.get({
                formId: $stateParams.formId
            }, function(form){
                CurrentForm.setForm(form);
                $scope.myform = form;
                $scope.myform._id = $stateParams.formId;
            }, function(err){
                console.error('Could not fetch form');
                console.error(err);
            });
        };

        $scope.setForm = function(form){
            $scope.myform = form;
        };
        $rootScope.resetForm = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

        /* 
        ** DeleteModal Functions 
        */
        $scope.openDeleteModal = function(){
            $scope.deleteModal = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'AdminFormController',
            });
        };
        $scope.cancelDeleteModal = function(){
            if($scope.deleteModal){
                $scope.deleteModal.dismiss('cancel');
            }
        };

        // Remove existing Form
        $scope.removeCurrentForm = function() {
            if($scope.deleteModal && $scope.deleteModal.opened){

                $scope.deleteModal.close();
            
                var form_id = $scope.myform._id;
                if(!form_id) throw new Error('Error - removeCurrentForm(): $scope.myform._id does not exist');
        
                $http.delete('/forms/'+form_id)
                    .success(function(data, status, headers){
                        console.log('form deleted successfully');

                        $state.go('listForms', {}, {reload: true}); 

                    }).error(function(error){
                        console.log('ERROR: Form could not be deleted.');
                        console.error(error);
                    });
            }
        };

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, cb){

            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }
            
            //Update form if we **are not currently updating** or if **shouldUpdateNow flag is set**
            if(continueUpdate){
                // console.log('begin updating form');
                var err = null;

                if(!updateImmediately){ $rootScope.saveInProgress = true; }

                $scope.updatePromise = $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        $rootScope.myform = $scope.myform = response.data;
                        // console.log(response.data);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        // console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        // console.log('finished updating');
                        if(!updateImmediately){$rootScope.saveInProgress = false; }

                        if( (typeof cb) === 'function'){
                            cb(err); 
                        }
                    });
            }
        };


	}
]);
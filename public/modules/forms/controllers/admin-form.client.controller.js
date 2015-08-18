'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$modal',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $modal) {

        var deleteModal;
        $scope = $rootScope;

        $scope.myform = CurrentForm.getForm();
        $rootScope.saveInProgress = false;

        // Find a specific Form
        $scope.findOne = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
            CurrentForm.setForm($scope.myform);
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

            deleteModal = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'AdminFormController',
            });
        };
        $scope.cancelDeleteModal = function(){
            if(deleteModal){
                deleteModal.dismiss('cancel');
            }
        };

        // Remove existing Form
        $scope.remove = function(form_id) {
            if(deleteModal && deleteModal.opened){

                deleteModal.close();
            
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
                    }).finally(function(){

                    });
            }
        };


        // Update existing Form
        $scope.update = $rootScope.update = function(shouldUpdateNow, cb){
            // console.log('shouldUpdateNow: '+shouldUpdateNow);
            var continueUpdate = true;
            if(shouldUpdateNow){
               continueUpdate = !$rootScope.saveInProgress;
            }
            
            if(continueUpdate){
                console.log('begin updating form');
                var err = null;

                if(shouldUpdateNow){ $rootScope.saveInProgress = true; }

                $scope.updatePromise = $http.put('/forms/'+$scope.myform._id, {form: $scope.myform})
                    .then(function(response){
                        $rootScope.myform = $scope.myform = response.data;
                        console.log(response.data);
                    }).catch(function(response){
                        console.log('Error occured during form UPDATE.\n');
                        console.log(response.data);
                        err = response.data;
                    }).finally(function() { 
                        console.log('finished updating');
                        if(shouldUpdateNow){$rootScope.saveInProgress = false; }
                        cb(err); 
                    });
            }
        };

	}
]);
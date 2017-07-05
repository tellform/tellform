'use strict';

// Forms controller
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal) {

        $scope = $rootScope;
        $scope.forms = {};
        $scope.showCreateModal = false;

		$rootScope.languageRegExp = {
			regExp: /[@!#$%^&*()\-+={}\[\]|\\/'";:`.,~№?<>]+/i,
			test: function(val) {
				return !this.regExp.test(val);
			}
		};

		/*
		 ** DeleteModal Functions
		 */
		$scope.openDeleteModal = function(index){
			$scope.deleteModal = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'deleteModalListForms.html',
				controller:  function($uibModalInstance, items, $scope) {
					$scope.content = items;

					$scope.cancel = $scope.cancelDeleteModal;

					$scope.deleteForm = function() {
						$scope.$parent.removeForm(items.formIndex);
					};
				},
				resolve: {
					items: function() {
						return {
							currFormTitle: $scope.myforms[index].title,
							formIndex: index
						};
					}
				}
			});
		};


		$scope.cancelDeleteModal = function(){
			if($scope.deleteModal){
				$scope.deleteModal.dismiss('cancel');
			}
		};

        // Return all user's Forms
        $scope.findAll = function() {
            Forms.query(function(_forms){
                $scope.myforms = _forms;
            });
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

        $scope.setForm = function (form) {
            $scope.myform = form;
        };
        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        $scope.duplicateForm = function(form_index){
            var form = _.cloneDeep($scope.myforms[form_index]);
            delete form._id;

            $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    $scope.myforms.splice(form_index+1, 0, data);
                }).error(function(errorResponse){
                    console.error(errorResponse);
                    if(errorResponse === null){
                        $scope.error = errorResponse.data.message;
                    }
                });
        };

        // Create new Form
        $scope.createNewForm = function(){
            // console.log($scope.forms.createForm);

            var form = {};
            form.title = $scope.forms.createForm.title.$modelValue;
            form.language = $scope.forms.createForm.language.$modelValue;

            if($scope.forms.createForm.$valid && $scope.forms.createForm.$dirty){
                $http.post('/forms', {form: form})
                .success(function(data, status, headers){
                    //console.log('new form created');
                    // Redirect after save
                    $scope.goToWithId('viewForm.create', data._id+'');
                }).error(function(errorResponse){
                    console.error(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.removeForm = function(form_index) {
            if(form_index >= $scope.myforms.length || form_index < 0){
                throw new Error('Error: form_index in removeForm() must be between 0 and '+$scope.myforms.length-1);
            }

            $http.delete('/forms/'+$scope.myforms[form_index]._id)
                .success(function(data, status, headers){
                    //console.log('form deleted successfully');
                    $scope.myforms.splice(form_index, 1);
					$scope.cancelDeleteModal();
                }).error(function(error){
                    //console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });
        };
    }
]);

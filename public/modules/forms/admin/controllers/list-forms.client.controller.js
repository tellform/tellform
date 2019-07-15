'use strict';

// Forms controller
angular.module('forms').controller('ListFormsController', ['$rootScope', '$scope', '$stateParams', '$state', 'GetForms', 'CurrentForm', '$http', '$uibModal', 'myForms', '$window',
	function($rootScope, $scope, $stateParams, $state, GetForms, CurrentForm, $http, $uibModal, myForms, $window) {

        $scope = $rootScope;
        $scope.forms = {};
        $scope.showCreateModal = false;
        $scope.myforms = myForms;
        $scope.formLanguage = $window.$locale;

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

        $scope.duplicateForm = function(form_index){
            var form = _.cloneDeep($scope.myforms[form_index]);
            delete form._id;
            delete form.id;

            form.title += ' copy';

            $http.post('/forms', {form: form})
                .then(function(resp_data, status, headers){
                    var result_form = resp_data.data;
                    result_form.submissionNum = 0;
                    $scope.myforms.splice(form_index+1, 0, result_form);
                }, function(errorResponse){
                    console.error(errorResponse);
                    if(errorResponse === null){
                        $scope.error = errorResponse.data.message;
                    }
                });
        };

        // Create new Form
        $scope.createNewForm = function(){
            var form = {};
            form.title = $scope.forms.createForm.title.$modelValue;
            form.language = $scope.forms.createForm.language.$modelValue;

            if($scope.forms.createForm.$valid && $scope.forms.createForm.$dirty){
                $http.post('/forms', {form: form})
                    .then(function(response, status, headers){
                        // Redirect after save
                        $state.go('viewForm.create', {formId: response.data.id}, {reload: true});
                    }, function(errorResponse){
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
                .then(function(data, status, headers){
                    $scope.myforms.splice(form_index, 1);
					$scope.cancelDeleteModal();
                }, function(error){
                    console.error(error);
                });
        };
    }
]);

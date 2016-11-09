'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter', '$sce',
	function($rootScope, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter, $sce) {

		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		};

		//Set active tab to Create
		$scope.activePill = 0;

		$scope.copied = false;
		$scope.onCopySuccess = function(e) {
			$scope.copied = true;
		};

        $scope = $rootScope;
        $scope.animationsEnabled = true;
        $scope.myform = myForm;
        $rootScope.saveInProgress = false;

        CurrentForm.setForm($scope.myform);

		$scope.formURL = "/#!/forms/" + $scope.myform._id;

		if(window.location.host.split('.').length < 3){
			$scope.actualFormURL = window.location.protocol + '//' + $scope.myform.admin.username + '.' + window.location.host + $scope.formURL;
		} else {
			$scope.actualFormURL = window.location.protocol + '//' + $scope.myform.admin.username + '.' + window.location.host.split('.').slice(1,3).join('.') +  $scope.formURL;
		}

		var refreshFrame = $scope.refreshFrame = function(){
			if(document.getElementById('iframe')) {
				document.getElementById('iframe').contentWindow.location.reload();
			}
		};

		$scope.tabData   = [
            {
                heading: $filter('translate')('CONFIGURE_TAB'),
				templateName:   'configure'
            },
            {
                heading: $filter('translate')('ANALYZE_TAB'),
				templateName:   'analyze'
            }
        ];

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
            $scope.deleteModal = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'myModalContent.html',
				controller: 'AdminFormController',
				resolve: {
					myForm: function(){
						return $scope.myform;
					}
				}
            });
            $scope.deleteModal.result.then(function (selectedItem) {
            	$scope.selected = selectedItem;
            }, function () {
            	console.log('Modal dismissed at: ' + new Date());
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
        $scope.update = $rootScope.update = function(updateImmediately, diffChanges, cb){
			refreshFrame();

            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }

            //Update form **if we are not currently updating** or if **shouldUpdateNow flag is set**
            if(continueUpdate){
                var err = null;

                if(!updateImmediately){ $rootScope.saveInProgress = true; }

                $scope.updatePromise = $http.put('/forms/'+$scope.myform._id, { changes: diffChanges })
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
                            return cb(err);
                        }
                    });
            }
        };


	}
]);

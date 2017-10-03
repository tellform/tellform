'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$window', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter', 'User',
    function($rootScope, $window, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter, user) {

        $scope.activePill = 0;
        $scope = $rootScope;
        $scope.animationsEnabled = true;
        $scope.myform = myForm;

        user.getCurrent().then(function(myUser) {
            $scope.user = myUser;
        });

        $scope.button_clicked  = false;
        $scope.admin_button_clicked  = false;
        $rootScope.saveInProgress = false;
        $scope.success = $scope.error = null;
        $scope.show_msg = false;

        CurrentForm.setForm($scope.myform);

        // :agency
        $scope.formURL = '/#!/forms/' + $scope.myform.admin.agency.shortName +'/' + $scope.myform._id
        $scope.actualFormURL = window.location.protocol + '//' + window.location.host + $scope.formURL;

        var refreshFrame = $scope.refreshFrame = function(){
            if(document.getElementById('iframe')) {
                document.getElementById('iframe').contentWindow.location.reload();
            }
        };

        $scope.openAdminModal = function() {
            $uibModal.open({
                        animation: true,
                        templateUrl: 'adminModal.html',
                        windowClass: 'admin-modal-window',
                        controller:  function($uibModalInstance, $scope) {

                $scope.saveAdminModal = function(myform, adminForm) {
                    $scope.update(false, myform, false, function() { $uibModalInstance.close(); }, adminForm);
                }

                $scope.closeAdminModal = function() {
                    $uibModalInstance.close();
                }

            }});
        }

        $scope.setForm = function(form){
            $scope.myform = form;
        };

        $rootScope.resetForm = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

        $scope.validate_emails = function(emails, configureForm) {
            var emails_arr = emails.split(',');
            var re = /\S+@\S+\.\S+/;
            for (var i = 0; i < emails_arr.length; i++) { 
                if (re.test(emails_arr[i]) == false) {
                    configureForm.email_list.$setValidity("text", false);
                    return
                }
            }
            configureForm.email_list.$setValidity("text", true);
        };

        $scope.validate_collaborators = function(emails, adminForm) {
            if (emails.trim() === '') {
                adminForm.collaborator_list.$setValidity("text", true);
                return;    
            }

            // In the future, check if collaborators are actual users in the database
            var emails_arr = emails.split(',');

            var re = /\S+@\S+\.\S+/;
            for (var i = 0; i < emails_arr.length; i++) { 
                if (re.test(emails_arr[i]) == false) {
                    adminForm.collaborator_list.$setValidity("text", false);
                    return
                }
            }

            adminForm.collaborator_list.$setValidity("text", true);
        };

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, data, refreshAfterUpdate, cb, configureForm) {

            if (cb === null) { // null callback applies outside of admin panel
                $scope.button_clicked  = true;
            } else {
                $scope.admin_button_clicked = true;    
            }

            refreshFrame();

            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }

            //Update form **if we are not currently updating** or if **shouldUpdateNow flag is set**
            if(continueUpdate) {
                var err = null;

                if (!updateImmediately) {
                    $rootScope.saveInProgress = true;
                }

                $scope.success = $scope.error = null;
            
                var dataToSend = data;

                $scope.updatePromise = $http.put('/forms/' + $scope.myform.admin.agency.shortName + '/' + $scope.myform._id, {form: dataToSend})
                    .then(function (response) {
                        $scope.success = 'Changes Saved!'
                        if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;

                    }).catch(function (response) {
                        console.log('Error occured during form UPDATE.\n');
                        err = response.data.message;
                        $scope.error = err 
                    }).finally(function () { 

                        window.setTimeout(function() {
                            $scope.$apply(function() {
                                if (cb === null) {
                                    $scope.button_clicked  = false;     
                                    $scope.show_msg = true
                                } else {
                                    $scope.admin_button_clicked = false;    
                                }
                                
                                window.setTimeout(function() {
                                    $scope.$apply(function() {
                                        $scope.show_msg = false
                                        if (!(configureForm === undefined)) {
                                            configureForm.$setPristine();
                                        }
                                    });
                                }, 2000);
                            });
                        }, 1000);
                        
                        if (!updateImmediately) {
                            $rootScope.saveInProgress = false;
                        }

                        if ((typeof cb) === 'function') {
                            return cb(err);
                        }
                    });

            }
        };
    }
]);

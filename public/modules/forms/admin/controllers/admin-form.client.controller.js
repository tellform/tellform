'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$window', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter',
    function($rootScope, $window, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter) {

        $scope.activePill = 0;
        $scope = $rootScope;
        $scope.animationsEnabled = true;
        $scope.myform = myForm;
        $scope.button_clicked  = false;
        $rootScope.saveInProgress = false;
        $scope.success = $scope.error = null;
        $scope.show_msg = false;
        $scope.invalid_email = false

        CurrentForm.setForm($scope.myform);

        // :agency
        $scope.formURL = '/#!/forms/' + $scope.myform.admin.agency.shortName +'/' + $scope.myform._id
        $scope.actualFormURL = window.location.protocol + '//' + window.location.host + $scope.formURL;

        var refreshFrame = $scope.refreshFrame = function(){
            if(document.getElementById('iframe')) {
                document.getElementById('iframe').contentWindow.location.reload();
            }
        };

        $scope.setForm = function(form){
            $scope.myform = form;
        };

        $rootScope.resetForm = function(){
            $scope.myform = Forms.get({
                formId: $stateParams.formId
            });
        };

        $scope.validate_emails = function(emails, configureForm) {
            var emails_arr = emails.split(',')
            var re = /\S+@\S+\.\S+/;
            for (var i = 0; i < emails_arr.length; i++) { 
                if (re.test(emails_arr[i]) == false) {
                    configureForm.email_list.$setValidity("text", false);
                    return
                }
            }
            configureForm.email_list.$setValidity("text", true);
        };

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, data, isDiffed, refreshAfterUpdate, cb, configureForm){

            $scope.button_clicked  = true;

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
                if (isDiffed) {

                    $scope.updatePromise = $http.put('/forms/' + $scope.myform.admin.agency.shortName +'/' + $scope.myform._id, {changes: data})
                        .then(function (response) {
                            $scope.success = 'Changes Saved!'
                            if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;

                        }).catch(function (response) {
                            console.log('Error occured during form UPDATE.\n');
                            err = response.data.message;
                            $scope.error = err 
                        }).finally(function () {
                            // console.log('finished updating');

                            window.setTimeout(function() {
                                $scope.$apply(function() {
                                    $scope.button_clicked  = false; 
                                    $scope.show_msg = true
                                    window.setTimeout(function() {
                                        $scope.$apply(function() {
                                            $scope.show_msg = false
                                            configureForm.$setPristine();
                                        });
                                    }, 1000);
                                });
                            }, 1000);

                            if (!updateImmediately) {
                                $rootScope.saveInProgress = false;
                            }

                            if ((typeof cb) === 'function') {
                                return cb(err);
                            }
                        });

                } else {

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
                                    $scope.button_clicked  = false; 
                                    $scope.show_msg = true
                                    window.setTimeout(function() {
                                        $scope.$apply(function() {
                                            $scope.show_msg = false
                                            configureForm.$setPristine();
                                        });
                                    }, 1000);
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
            }
        };
    }
]);

'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$window', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter', '$translate',
    function($rootScope, $window, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter, $translate) {

        //Set active tab to Create
        $scope.activePill = 0;

        $scope.copied = false;
        $scope.onCopySuccess = function (e) {
            $scope.copied = true;
        };

        $scope = $rootScope;
        $scope.animationsEnabled = true;
        $scope.myform = myForm;
        $rootScope.saveInProgress = false;
        $scope.oldForm = _.cloneDeep($scope.myform);

        CurrentForm.setForm($scope.myform);

        $scope.formURL = '/#!/forms/' + $scope.myform._id;

        if ($scope.myform.isLive) {
            if ($window.subdomainsDisabled === true) {
                $scope.actualFormURL = window.location.protocol + '//' + window.location.host + '/view' + $scope.formURL;
            } else {
                if (window.location.host.split('.').length < 3) {
                    $scope.actualFormURL = window.location.protocol + '//' + $scope.myform.admin.username + '.' + window.location.host + $scope.formURL;
                } else {
                    $scope.actualFormURL = window.location.protocol + '//' + $scope.myform.admin.username + '.' + window.location.host.split('.').slice(1, 3).join('.') + $scope.formURL;
                }
            }
        } else {
            $scope.actualFormURL = window.location.protocol + '//' + window.location.host + $scope.formURL;
        }


        var refreshFrame = $scope.refreshFrame = function(){
            if(document.getElementById('iframe')) {
                document.getElementById('iframe').contentWindow.location.reload();
            }
        };

        $scope.tabData = [
            {
                heading: $filter('translate')('CONFIGURE_TAB'),
                templateName:   'configure'
            }
        ];

        $scope.designTabActive = false

        $scope.deactivateDesignTab = function(){
            $scope.designTabActive = false
        }

        $scope.activateDesignTab = function(){
            $scope.designTabActive = true
        }

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
                templateUrl: 'formDeleteModal.html',
                controller: 'AdminFormController',
                resolve: {
                    myForm: function(){
                        return $scope.myform;
                    }
                }
            });
            $scope.deleteModal.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
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
                    .then(function(response){
                        $state.go('listForms', {}, {reload: true})
                    }, function(error){
                        console.error(error);
                    });
            }
        };

        $scope.updateDesign = function(updateImmediately, data, shouldDiff, refreshAfterUpdate){
            $scope.update(updateImmediately, data, shouldDiff, refreshAfterUpdate, function(){
                refreshFrame();
            });
        }

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, data, shouldDiff, refreshAfterUpdate, cb){
            var continueUpdate = true;
            if(!updateImmediately){
                continueUpdate = !$rootScope.saveInProgress;
            }

            //Update form **if we are not in the middle of an update** or if **shouldUpdateNow flag is set**
            if(continueUpdate) {
                var err = null;

                if (!updateImmediately) {
                    $rootScope.saveInProgress = true;
                }

                if (shouldDiff) {
                    //Do this so we can create duplicate fields
                    var checkForValidId = new RegExp('^[0-9a-fA-F]{24}$');
                    for(var i=0; i < $scope.myform.form_fields.length; i++){
                        var field = $scope.myform.form_fields[i];
                        if(!checkForValidId.exec(field._id+'')){
                            delete $scope.myform.form_fields[i]._id;
                            delete $scope.myform.form_fields[i].id;
                        }
                    }

                    var data = DeepDiff.diff($scope.oldForm, $scope.myform);

                    $scope.updatePromise = $http.put('/forms/' + $scope.myform._id, {changes: data})
                        .then(function (response) {
                            if (refreshAfterUpdate) {
                                $rootScope.myform = $scope.myform = response.data;
                                $scope.oldForm = _.cloneDeep($scope.myform);
                            }
                        }).catch(function (response) {
                            err = response.data;
                            console.error(err);
                        }).finally(function () {
                            if (!updateImmediately) {
                                $rootScope.saveInProgress = false;
                            }

                            if ((typeof cb) === 'function') {
                                return cb(err);
                            }
                        });
                } else {
                    var dataToSend = data;
                    if(dataToSend.analytics && dataToSend.analytics.visitors){
                        delete dataToSend.analytics.visitors;
                    }
                    if(dataToSend.submissions){
                        delete dataToSend.submissions;
                    }

                    if(dataToSend.visible_form_fields){
                        delete dataToSend.visible_form_fields;
                    }

                     if(dataToSend.analytics){
                        delete dataToSend.analytics.visitors;
                        delete dataToSend.analytics.fields;
                        delete dataToSend.analytics.submissions;
                        delete dataToSend.analytics.views;
                        delete dataToSend.analytics.conversionRate;
                    }

                    delete dataToSend.created;
                    delete dataToSend.lastModified;
                    delete dataToSend.__v;

                    $scope.updatePromise = $http.put('/forms/' + $scope.myform._id, {form: dataToSend})
                        .then(function (response) {
                            if (refreshAfterUpdate) {
                                $rootScope.myform = $scope.myform = response.data;
                            }

                        }).catch(function (response) {
                            err = response.data;
                            console.error(err);
                        }).finally(function () {
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
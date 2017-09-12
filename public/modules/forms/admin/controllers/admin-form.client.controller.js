'use strict';

// Forms controller
angular.module('forms').controller('AdminFormController', ['$rootScope', '$window', '$scope', '$stateParams', '$state', 'Forms', 'CurrentForm', '$http', '$uibModal', 'myForm', '$filter',
    function($rootScope, $window, $scope, $stateParams, $state, Forms, CurrentForm, $http, $uibModal, myForm, $filter) {

        $scope.activePill = 0;
        $scope = $rootScope;
        $scope.animationsEnabled = true;
        $scope.myform = myForm;
        $rootScope.saveInProgress = false;

        CurrentForm.setForm($scope.myform);

        // :agency
        console.log('in admin form client controller')
        console.log($scope)
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

        // Update existing Form
        $scope.update = $rootScope.update = function(updateImmediately, data, isDiffed, refreshAfterUpdate, cb){
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


                if (isDiffed) {

                    $scope.updatePromise = $http.put('/forms/' + $scope.myform.admin.agency.shortName +'/' + $scope.myform._id, {changes: data})
                        .then(function (response) {

                            if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;

                        }).catch(function (response) {
                            console.log('Error occured during form UPDATE.\n');
                            err = response.data;
                        }).finally(function () {
                            // console.log('finished updating');
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

                            if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;

                        }).catch(function (response) {
                            console.log('Error occured during form UPDATE.\n');
                            err = response.data;
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

'use strict';

angular.module('forms').directive('submitFormDirective', ['$http', '$timeout', 'TimeCounter', 'Auth', '$filter', '$rootScope',
    function ($http, $timeout, TimeCounter, Auth, $filter, $rootScope) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/submit-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($scope){
                angular.element(document).ready(function() {
                    $scope.error = '';
                    $scope.selected = null;
                    $scope.submitted = false;

                    TimeCounter.startClock()

                    $rootScope.setActiveField = function (field_id) {
                        $scope.selected = field_id;
                    };
                    $scope.hideOverlay = function (){
                        $scope.selected = null;
                    };

                    $scope.submit = function(){
                        var _timeElapsed = TimeCounter.stopClock();

                        var form = _.cloneDeep($scope.myform);
                        form.timeElapsed = _timeElapsed;

                        // console.log('percentageComplete: '+$filter('formValidity')($scope.myform)/$scope.myform.visible_form_fields.length*100+'%');
                        form.percentageComplete = $filter('formValidity')($scope.myform)/$scope.myform.visible_form_fields.length*100;
                        console.log(form.percentageComplete)
                        delete form.visible_form_fields;

                        $scope.authentication = Auth;

                        $scope.submitPromise = $http.post('/forms/'+$scope.myform._id, form)
                            .success(function(data, status, headers){
                                console.log('form submitted successfully');
                                $scope.myform.submitted = true;
                            })
                            .error(function(error){
                                console.log(error);
                                $scope.error = error.message;
                            });
                    };


                    $scope.exitStartPage = function () {
                        $scope.myform.startPage.showStart = false;
                    };

                    $scope.reloadForm = function(){
                        //Reset Timer
                        TimeCounter.stopClock();
                        TimeCounter.startClock();

                        //Reset Form
                        $scope.myform.submitted = false;
                        $scope.myform.form_fields = _.chain($scope.myform.form_fields).map(function(field){
                                field.fieldValue = '';
                                return field;
                            }).value();
                    };
                });

            }
        };
    }
]);
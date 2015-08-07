'use strict';

angular.module('forms').directive('formDirective', ['$http', '$timeout', 'timeCounter', 'Auth', '$filter', '$rootScope',
    function ($http, $timeout, timeCounter, Auth, $filter, $rootScope) {
        return {
            templateUrl: './modules/forms/views/directiveViews/form/submit-form.html',
            restrict: 'E',
            scope: {
                form:'='
            },
            controller: function($scope){
                angular.element(document).ready(function() {

                    $scope.selected = null;
                    timeCounter.startClock()

                    $rootScope.setActiveField = function (field_id) {
                        console.log('form field clicked: '+field_id);
                        $scope.selected = field_id;
                        console.log($scope.selected);
                    };
                    $scope.hideOverlay = function (){
                        $scope.selected = null;
                        console.log($scope.myForm);
                    };

                    $scope.submit = function(){
                        var _timeElapsed = timeCounter.stopClock();
                        $scope.form.timeElapsed = _timeElapsed;

                        // console.log('percentageComplete: '+$filter('formValidity')($scope.form)/$scope.form.visible_form_fields.length*100+'%');
                        $scope.form.percentageComplete = $filter('formValidity')($scope.form)/$scope.form.visible_form_fields.length*100;
                        console.log($scope.form.percentageComplete);
                        // delete $scope.form.visible_form_fields;

                        $scope.authentication = Auth;

                        $scope.submitPromise = $http.post('/forms/'+$scope.form._id,$scope.form)
                            .success(function(data, status, headers){
                                console.log('form submitted successfully');
                                // alert('Form submitted..');
                                $scope.form.submitted = true;
                            })
                            .error(function(error){
                                console.log(error);
                                $scope.error = error.message;
                            });
                    };


                    $scope.exitStartPage = function () {
                        $scope.form.startPage.showStart = false;
                    };

                    $scope.reloadForm = function(){
                        timeCounter.stopClock();
                        timeCounter.startClock();
                        $scope.form.submitted = false;
                        $scope.form.form_fields = _.chain($scope.form.form_fields).map(function(field){
                            field.fieldValue = '';
                            return field;
                        }).value();
                    };
                });

            }
        };
    }
]);
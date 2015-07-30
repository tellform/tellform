'use strict';

angular.module('forms').directive('formDirective', ['$http', '$timeout', 'timeCounter', 'Auth', '$filter',
    function ($http, $timeout, timeCounter, Auth, $filter) {
        return {
            controller: function($scope){
                timeCounter.startClock();

                $scope.submit = function(){
                    var _timeElapsed = timeCounter.stopClock();
                    $scope.form.timeElapsed = _timeElapsed;

                    $scope.form.percentageComplete = $filter('formValidity')($scope.form.visible_form_fields)/$scope.visible_form_fields.length;
                    delete $scope.form.visible_form_fields;

                    $scope.authentication = Auth;
                    // console.log($scope.authentication.isAuthenticated());

                    $scope.submitPromise = $http.post('/forms/'+$scope.form._id,$scope.form).
                    success(function(data, status, headers){
                        console.log('form submitted successfully');
                        // alert('Form submitted..');
                        $scope.form.submitted = true;
                    })
                    .error(function(error){
                        console.log(error);
                        $scope.error = error.message;
                    });
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

            },
            templateUrl: './modules/forms/views/directiveViews/form/submit-form.html',
            restrict: 'E',
            scope: {
                form:'='
            }
        };
    }
]);
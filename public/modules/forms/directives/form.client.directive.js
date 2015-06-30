'use strict';

angular.module('forms').directive('formDirective', ['$http', '$timeout', 'timeCounter',
    function ($http, $timeout, timeCounter) {
        return {
            controller: function($scope){
                timeCounter.startClock();


                $scope.submit = function(){
                    var _timeElapsed = timeCounter.stopClock();
                    $scope.form.timeElapsed = _timeElapsed;

                    console.log($scope.form.timeElapsed);

                    // console.log($scope.form.form_fields[7]);

                    $http.post('/forms/'+$scope.form._id,$scope.form).
                    success(function(data, status, headers){
                        console.log('form submitted successfully');
                        alert('Form submitted..');
                        $scope.form.submitted = true;
                    });
                };

                $scope.cancel = function(){
                    alert('Form canceled..');
                };

            },
            templateUrl: './modules/forms/views/directiveViews/form/form.html',
            restrict: 'E',
            scope: {
                form:'='
            }
        };
    }
]);
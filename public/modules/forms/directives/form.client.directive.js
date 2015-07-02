'use strict';

angular.module('forms').directive('formDirective', ['$http', '$timeout', 'timeCounter', 'Auth',
    function ($http, $timeout, timeCounter, Auth) {
        return {
            controller: function($scope){
                timeCounter.startClock();

                $scope.submit = function(){
                    var _timeElapsed = timeCounter.stopClock();
                    $scope.form.timeElapsed = _timeElapsed;

                    // console.log($scope.form.timeElapsed);
                    $scope.authentication = Auth;
                    console.log($scope.authentication.isAuthenticated());

                    $http.post('/forms/'+$scope.form._id,$scope.form).
                    success(function(data, status, headers){
                        console.log('form submitted successfully');
                        alert('Form submitted..');
                        $scope.form.submitted = true;
                    })
                    .error(function(error){
                        console.log(error);
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
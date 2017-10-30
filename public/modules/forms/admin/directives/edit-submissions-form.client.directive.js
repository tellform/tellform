'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http', 'Forms', '$stateParams', '$interval',
    function ($rootScope, $http, Forms, $stateParams, $interval) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html',
            restrict: 'E',
            scope: {
                user:'=',
                myform: '='
            },
            controller: function($scope){

                $scope.table = {
                    masterChecker: false,
                    rows: []
                };

                var getSubmissions = function(){
                    $http({
                      method: 'GET',
                      url: '/forms/'+$scope.myform._id+'/submissions'
                    }).then(function successCallback(response) {
                        var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

                        var submissions = response.data || [];

                        //Iterate through form's submissions
                        for(var i = 0; i < submissions.length; i++){
                            for(var x = 0; x < submissions[i].form_fields.length; x++){
                                if(submissions[i].form_fields[x].fieldType === 'dropdown'){
                                    submissions[i].form_fields[x].fieldValue = submissions[i].form_fields[x].fieldValue.option_value;
                                }
                            }
                            submissions[i].selected = false;
                        }

                        $scope.table.rows = submissions;
                    });
                };

                var getVisitors = function(){
                    $http({
                      method: 'GET',
                      url: '/forms/'+$scope.myform._id+'/visitors'
                    }).then(function successCallback(response) {
                        var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

                        var visitors = response.data || [];

                        $scope.visitors = visitors;
                    });
                };

                getSubmissions();
                getVisitors();

                /*
                ** Analytics Functions
                */
                $scope.AverageTimeElapsed = (function(){
                    var totalTime = 0;
                    var numSubmissions = $scope.table.rows.length;

                    for(var i=0; i<$scope.table.rows.length; i++){
                        totalTime += $scope.table.rows[i].timeElapsed;
                    }

                    if(numSubmissions === 0) {
                        return 0;
                    }
                    return (totalTime/numSubmissions).toFixed(0);
                })();

                var updateFields = $interval(getSubmissions, 100000);
                var updateFields = $interval(getVisitors, 1000000);

                $scope.$on('$destroy', function() {
                    if (updateFields) {
                        $interval.cancel($scope.updateFields);
                    }
                });

                /*
                ** Table Functions
                */
                $scope.isAtLeastOneChecked = function(){
                    for(var i=0; i<$scope.table.rows.length; i++){
                        if($scope.table.rows[i].selected) return true;
                    }
                    return false;
                };
                $scope.toggleAllCheckers = function(){
                    for(var i=0; i<$scope.table.rows.length; i++){
                        $scope.table.rows[i].selected = $scope.table.masterChecker;
                    }
                };
                $scope.toggleObjSelection = function($event) {
                    $event.stopPropagation();
                };
                $scope.rowClicked = function(row_index) {
                   $scope.table.rows[row_index].selected = !$scope.table.rows[row_index].selected;
                };

                /*
                * Form Submission Methods
                */

                //Delete selected submissions of Form
                $scope.deleteSelectedSubmissions = function(){

                    var delete_ids = _.chain($scope.table.rows).filter(function(row){
                        return !!row.selected;
                    }).pluck('_id').value();

                    $http({ url: '/forms/'+$scope.myform._id+'/submissions',
                            method: 'DELETE',
                            data: {deleted_submissions: delete_ids},
                            headers: {'Content-Type': 'application/json;charset=utf-8'}
                        }).success(function(data, status){
                            //Remove deleted ids from table
                            var tmpArray = [];
                            for(var i=0; i<$scope.table.rows.length; i++){
                                if(!$scope.table.rows[i].selected){
                                    tmpArray.push($scope.table.rows[i]);
                                }
                            }
                            $scope.table.rows = tmpArray;
                        })
                        .error(function(err){
                            console.error(err);
                        });
                };

                //Export selected submissions of Form
                $scope.exportSubmissions = function(type){
                    angular.element('#table-submission-data').tableExport({type: type, escape:false, ignoreColumn: [0]});
                };

            }
        };
    }
]);


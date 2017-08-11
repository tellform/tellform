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

		var submissions = $scope.myform.submissions || [];

                        //Iterate through form's submissions
                        for(var i = 0; i < submissions.length; i++){
                            for(var x = 0; x < submissions[i].form_fields.length; x++){
                                if(submissions[i].form_fields[x].fieldType === 'dropdown'){
                                    submissions[i].form_fields[x].fieldValue = submissions[i].form_fields[x].fieldValue.option_value;
                                }
                                //var oldValue = submissions[i].form_fields[x].fieldValue || '';
                                //submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
                                //submissions[i].form_fields[x].fieldValue = oldValue;
                            }
                            submissions[i].selected = false;
                        }

                        $scope.table.rows = submissions;		

                var initController = function(){
                    Forms.get({
                        formId: $stateParams.formId
                    }, function(form){
                        $scope.myform = form;
                        var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

                        var submissions = $scope.myform.submissions || [];

                        //Iterate through form's submissions
                        for(var i = 0; i < submissions.length; i++){
                            for(var x = 0; x < submissions[i].form_fields.length; x++){
                                if(submissions[i].form_fields[x].fieldType === 'dropdown'){
                                    submissions[i].form_fields[x].fieldValue = submissions[i].form_fields[x].fieldValue.option_value;
                                }
                                //var oldValue = submissions[i].form_fields[x].fieldValue || '';
                                //submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
                                //submissions[i].form_fields[x].fieldValue = oldValue;
                            }
                            submissions[i].selected = false;
                        }

                        $scope.table.rows = submissions;
                    });
                };


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

                $scope.DeviceStatistics = (function(){
                    var newStatItem = function(){
                        return {
                            visits: 0,
                            responses: 0,
                            completion: 0,
                            average_time: 0,
                            total_time: 0
                        };
                    };

                    var stats = {
                        desktop: newStatItem(),
                        tablet: newStatItem(),
                        phone: newStatItem(),
                        other: newStatItem()
                    };

                    if($scope.myform.analytics && $scope.myform.analytics.visitors) {
                        var visitors = $scope.myform.analytics.visitors;
                        for (var i = 0; i < visitors.length; i++) {
                            var visitor = visitors[i];
                            var deviceType = visitor.deviceType;

                            stats[deviceType].visits++;

                            if (visitor.isSubmitted) {
                                stats[deviceType].total_time = stats[deviceType].total_time + visitor.timeElapsed;
                                stats[deviceType].responses++;
                            }

                            if(stats[deviceType].visits) {
                                stats[deviceType].completion = 100*(stats[deviceType].responses / stats[deviceType].visits).toFixed(2);
                            }

                            if(stats[deviceType].responses){
                                stats[deviceType].average_time = (stats[deviceType].total_time / stats[deviceType].responses).toFixed(0);
                            }
                        }
                    }
                    return stats;
                })();

                var updateFields = $interval(initController, 1000000);

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
                            console.log('Could not delete form submissions.\nError: ');
                            console.log(err);
                            console.error = err;
                        });
                };

                //Export selected submissions of Form
                $scope.exportSubmissions = function(type){

                    angular.element('#table-submission-data').tableExport({type: type, escape:false});
                };

            }
        };
    }
]);

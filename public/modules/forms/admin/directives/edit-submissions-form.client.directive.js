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
                $scope.analyticsData = {
                    deviceStatistics: [],
                    globalStatistics: []
                };

                $scope.deletionInProgress = false; 
                $scope.waitingForDeletion = false;

                //Waits until deletionInProgress is false before running getSubmissions
                $scope.$watch("deletionInProgress",function(newVal, oldVal){
                    if(newVal !== oldVal && newVal === false && $scope.waitingForDeletion) {
                        $scope.getSubmissions();
                        $scope.waitingForDeletion = false;
                    }
                });

                $scope.handleSubmissionsRefresh = function(){
                    if(!$scope.deletionInProgress) {
                        $scope.getSubmissions();
                    } else {
                        $scope.waitingForDeletion = true;
                    }
                };

                /*
                ** Analytics Functions
                */
                var formatGlobalStatistics = function(globalStatData){
                    if(!globalStatData || !globalStatData.length){
                        return {
                            visits: 0,
                            responses: 0,
                            conversion_rate: 0,
                            average_time: 0
                        };
                    }
                    return globalStatData[0];
                }
                        
                var formatDeviceStatistics = function(deviceStatData){
                    var newStatItem = function(){
                        return {
                            visits: 0,
                            responses: 0,
                            conversion_rate: 0,
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

                    if(deviceStatData && deviceStatData.length){
                        for(var i=0; i<deviceStatData.length; i++){
                            var currDevice = deviceStatData[i];

                            //_id here is deviceType of field due to aggregation in getVisitorData
                            if(stats[currDevice._id]){
                                stats[currDevice._id] = currDevice;
                            }
                        }
                    }
                    return stats;
                };

                $scope.getSubmissions = function(cb){
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

                        if(cb && typeof cb === 'function'){
                            cb();
                        }
                    }, function errorCallback(err){
                        console.error(err);
                        if(cb && typeof cb === 'function'){
                            cb(err);
                        }
                    });       
                };

                $scope.getVisitors = function(){
                    $http({
                      method: 'GET',
                      url: '/forms/'+$scope.myform._id+'/visitors'
                    }).then(function successCallback(response) {
                        var data = response.data || [];

                        $scope.analyticsData = data[0];
                        $scope.analyticsData.globalStatistics = formatGlobalStatistics($scope.analyticsData.globalStatistics);
                        $scope.analyticsData.deviceStatistics = formatDeviceStatistics($scope.analyticsData.deviceStatistics);
                    });
                };

                //Initialize analytics data
                $scope.analyticsData.globalStatistics = formatGlobalStatistics();
                $scope.analyticsData.deviceStatistics = formatDeviceStatistics();

                $scope.handleSubmissionsRefresh();
                $scope.getVisitors();

                //Fetch submissions and visitor data every 1.67 min
                var updateSubmissions = $interval($scope.handleSubmissionsRefresh, 100000);
                var updateVisitors = $interval($scope.getVisitors, 1000000);

                //Prevent $intervals from running after directive is destroyed
                $scope.$on('$destroy', function() {
                    if (updateSubmissions) {
                        $interval.cancel($scope.updateSubmissions);
                    }

                    if (updateVisitors) {
                        $interval.cancel($scope.updateVisitors);
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

                    $scope.deletionInProgress = true;
                    var delete_ids = _.chain($scope.table.rows).filter(function(row){
                        return !!row.selected;
                    }).pluck('_id').value();

                    return $http({ url: '/forms/'+$scope.myform._id+'/submissions',
                            method: 'DELETE',
                            data: {deleted_submissions: delete_ids},
                            headers: {'Content-Type': 'application/json;charset=utf-8'}
                        }).then(function(data, status){
                            $scope.deletionInProgress = true;
                            //Remove deleted ids from table
                            $scope.table.rows =  $scope.table.rows.filter(function(field){
                                return !field.selected;
                            });
                        }, function(err){
                            $scope.deletionInProgress = true;
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


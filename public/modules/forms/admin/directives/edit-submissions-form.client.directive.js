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
                            submissions[i].selected = false;
                        }

                        $scope.table.rows = submissions;
                    });
                };

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

                    $http({ url: '/forms/'+$scope.user.agency.shortName+'/'+$scope.myform._id+'/submissions',
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

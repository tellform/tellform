'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http',
    function ($rootScope, $http) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'='
            },
            controller: function($scope){
                $scope.table = {
                    masterChecker: false,
                    rows: []
                };

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
                $scope.toggleObjSelection = function($event, description) {
                    $event.stopPropagation();
                };
                $scope.rowClicked = function(row_index) {
                   $scope.table.rows[row_index].selected = !$scope.table.rows[row_index].selected;
                };

                /*
                * Form Submission Methods
                */

                //Fetch and display submissions of Form
                $scope.initFormSubmissions = function(){
                    $http.get('/forms/'+$scope.myform._id+'/submissions')
                        .success(function(data, status, headers){

                            var _tmpSubFormFields,
                                defaultFormFields = _.cloneDeep($scope.myform.form_fields);

                            // console.log('before textField2: '+data[0].form_fields[1].fieldValue);

                            //Iterate through form's submissions
                            for(var i=0; i<data.length; i++){
                                for(var x=0; x<data[i].form_fields; x++){
                                    var oldValue = data[i].form_fields[x].fieldValue || '';
                                    data[i].form_fields[x] =  _.merge(defaultFormFields, data[i].form_fields);
                                    data[i].form_fields[x].fieldValue = oldValue;
                                }
                                data[i].selected = false;
                            }
                            // console.log('after textField2: '+data[0].form_fields[1].fieldValue);

                            $scope.table.rows = data;

                            // console.log('form submissions successfully fetched');
                            // console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
                            // console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );
                        })
                        .error(function(err){
                            console.error('Could not fetch form submissions.\nError: '+err);
                        });
                };

                //Delete selected submissions of Form
                $scope.deleteSelectedSubmissions = function(){

                    var delete_ids = _.chain($scope.table.rows).filter(function(row){
                        return !!row.selected;
                    }).pluck('_id').value();

                    $http({ url: '/forms/'+$scope.myform._id+'/submissions',
                            method: 'DELETE',
                            data: {deleted_submissions: delete_ids},
                            headers: {'Content-Type': 'application/json;charset=utf-8'}
                        }).success(function(data, status, headers){
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
                    var fileMIMETypeMap = {
                        'xls': 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'json': 'json',
                        'csv': 'csv'
                    };

					console.log($scope.table.rows);
					
					angular.element('#table-submission-data').tableExport({type: type, escape:false});

					/*
                    var blob = new Blob([$scope.table.rows], {
                            type: 'application/'+fileMIMETypeMap[type]+';charset=utf-8'
                    });
                    saveAs(blob, $scope.myform.title+'_sumbissions_export_'+Date.now()+'.'+type);
                    */
                };

            }
        };
    }
]);

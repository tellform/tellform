'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http', 'Upload', '$timeout', 'TimeCounter', 'Auth', 'FormFields',
    function ($rootScope, $http, Upload, $timeout, TimeCounter, Auth, FormFields) {
        return {
            templateUrl: './modules/forms/views/directiveViews/form/edit-submissions-form.client.view.html',
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
                    // console.log('isAtLeastOneChecked');
                    for(var i=0; i<$scope.table.rows.length; i++){
                        if($scope.table.rows[i].selected) return true;
                    }
                    return false;
                };
                $scope.toggleAllCheckers = function(){
                    // console.log('toggleAllCheckers');
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
                //Delete selected submissions of Form
                $scope.deleteSelectedSubmissions = function(){
                    // console.log('deleteSelectedSubmissions');
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
                            console.log(tmpArray);
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
                        'csv': 'csv',
                    };

                    var blob = new Blob([document.getElementById('table-submission-data').innerHTM], {
                            type: 'application/'+fileMIMETypeMap[type]+';charset=utf-8'
                    });
                    saveAs(blob, $scope.myform.title+'_sumbissions_export_'+Date.now()+'.'+type);
                };


                //Fetch and display submissions of Form
                $scope.showSubmissions = function(){
                    $http.get('/forms/'+$scope.myform._id+'/submissions')
                        .success(function(data, status, headers){

                            var _data = [], 
                                _currentSubmission,
                                _tmpSubFormFields,
                                defaultFormFields = JSON.parse(JSON.stringify($scope.myform.form_fields));


                            //Iterate through form's submissions
                            for(var i=0; i<data.length; i++){
                                // _tmpSubFormFields = defaultFormFields;

                                _tmpSubFormFields = _.merge(defaultFormFields, data[i].form_fields);
                                _data[i].form_fields = _tmpSubFormFields;

                                // currentSubmission = data[i];

                                // for(var x=0; x<defaultFormFields.length; x++){

                                //     var currField__id = defaultFormFields[x]._id,
                                //         currField;

                                //     _.find(currentSubmission.form_fields, function(fieldItem, fieldIdx){ 
                                //         if(fieldItem._id === currField__id){ 
                                //             currField = fieldItem; 
                                //             return true;
                                //         }
                                //     });

                                //     if( (typeof currField) !== 'undefined'){
                                //         _tmpSubFormFields[x].fieldValue = currField.fieldValue;
                                //         _tmpSubFormFields[x].$$hashKey = currField.$$hashKey;
                                //     }else {
                                //         _tmpSubFormFields[x].fieldValue = '';
                                //     }

                                // }

                                // _data[i] = currentSubmission;
                                // _data[i].form_fields = _tmpSubFormFields;
                            }

                            // console.log(JSON.stringify(_data));
                            $scope.submissions = _data;
                            $scope.table.rows = _data;
                            if(!$scope.$$phase && !$scope.$digest){
                                $scope.$apply();
                            }
                            // console.log('form submissions successfully fetched');
                            // console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
                            // console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );
                        })
                        .error(function(err){
                            console.error('Could not fetch form submissions.\nError: '+err);
                        });            
                };



            }
        };
    }
]);
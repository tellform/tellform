'use strict';

// Admin Panel controller
angular.module('forms').controller('AdminPanelController', ['$scope', '$rootScope', '$http', 'Forms', '$stateParams', '$uibModal',
    function($rootScope, $scope, $http, Forms, $stateParams, $uibModal) {

        $scope.gridOptions = {
            rowHeight:45,
            enableSorting: true,
            enableFiltering: false,
            multiSelect: false,
            enableColumnMenus: false,
            enableCellEditOnFocus: true,
            enableRowHeaderSelection: true,
            enableFullRowSelection: true,
            enableSelectAll: true,
            multiSelect: true
        };


        $scope.msg = {};

        $scope.gridOptions = {
            
            columnDefs: [{
                    name: 'Reference Number',
                    field: '_id',
                    enableCellEdit: false
                },
                {
                    name: 'Full Name',
                    field: 'fullName'
                },
                {
                    name: 'Short Name',
                    field: 'shortName'
                },
                {
                    name: 'Email Domain',
                    field: 'emailDomain'
                },
                {
                    name: 'Logo',
                    field: 'logo',
                }
            ],
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;

                gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                    console.log('sorted on change')
                    getPage();
                });

                gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                    $scope.msg.lastCellEdited = 'edited row id:' + rowEntity._id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
                    var fieldName = colDef.field

                    $http.put('/agencies',{agency_id: rowEntity._id, agency_field: {fieldName  : newValue}} )
                        .success(function(response) {
                            console.log('agency update success')
                            console.log(response)
                        })
                        .error(function(err) {
                            console.log('agency update failure')
                            console.error(err);
                            $scope.error = err.message;
                        });

                    $scope.$apply();

                });
            }
        };

        var getPage = function() {
            $scope.selectedRows = undefined;
            console.log('in admin panel - get page')
            $http.get('/agencies')
                .success(function(response) {
                    console.log('get page success')
                    console.log(response)
                    $scope.gridOptions.data = response;
                })
                .error(function(err) {
                    console.error(err);
                    $scope.error = err.message;
                });
        };

        $scope.addAgency = function()
        {
            var _model = {
                "fullName": "Organization",
                "shortName": "org",
                "emailDomain": ["org.gov.sg"],
                "logo": "www.aws.com/org"
            };

            $http.post('/agencies', {agency: _model})
            .success(function(data, status, headers){
                _model["_id"] = data._id
                $scope.gridOptions.data.unshift(_model);
            }).error(function(errorResponse){
                console.error(errorResponse);
                $scope.error = errorResponse.data.message;
            });
        };

        getPage();

        $scope.openEditModal = function(){
                    $scope.editFieldModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'editFieldModal.html',
                        windowClass: 'edit-modal-window',
                        controller:  function($uibModalInstance, $scope) {
              var reader = new FileReader();
              var curr_field = 'dropdown'
                            $scope.field = curr_field;
                            $scope.showLogicJump = false;

              // if (curr_field.fieldOptionsFromFile) {
              //   curr_field.fileOptions = curr_field.fieldOptions;

              //   curr_field.manualOptions = [];
              //   curr_field.manualOptions.push('Option 1');
              // } else {
              //   curr_field.manualOptions = curr_field.fieldOptions;
              // }

                            // decides whether field options block will be shown
                            $scope.showAddOptions = function (field){
                                if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
                                    return true;
                                } else {
                                    return false;
                                }
                            };

                            // add new option to the field
                            $scope.addOption = function(currField){
                                if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                                    if (!currField.manualOptions) {
                                        currField.manualOptions = [];
                                    }

                                    var lastOptionID = currField.manualOptions.length + 1;
                                    currField.manualOptions.push('Option ' + lastOptionID);
                                }
                            };

                            // delete particular option
                            $scope.deleteOption = function (currField, option){
                                if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                                    for (var i = 0; i < currField.manualOptions.length; i++) {
                                        if (currField.manualOptions[i] === option) {
                                            currField.manualOptions.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                            };

              $scope.loadOptions = function(currField, files) {
                if (currField.fieldType === 'dropdown') {
                    var optionsFile = files[0];
                    currField.fieldOptionsFile = optionsFile.name;
                    currField.loadProgress = 0;

                    reader.onload = function(e) {
                        var fileContent = e.target.result;
                        var options = fileContent.split('\n').map(option => option.trim());
                        var uniq_options = [...new Set(options)];

                        currField.fileOptions = [];

                        for (let option of uniq_options) {
                            if (option) {
                                currField.fileOptions.push(option);
                            }
                        }

                        var progress = document.querySelector('.load-file-progress');
                        progress.classList.remove('active');
                    }

                    reader.onprogress = function(e) {
                        $timeout(function() {
                            if (e && e.lengthComputable) {
                                currField.loadProgress = Math.round((e.loaded * 100) / e.total);
                            }
                        }, 10);
                    };

                    reader.readAsText(optionsFile);
                }
              };


                            // decides whether rating block will be shown
                            $scope.showRatingOptions = function (field){
                                if(field.fieldType === 'rating'){
                                    return true;
                                } else {
                                    return false;
                                }
                            };

                            $scope.saveField = function() {
                                if (curr_field.fieldOptionsFromFile) {
                                    curr_field.fieldOptions = curr_field.fileOptions;
                                } else {
                                    curr_field.fieldOptionsFile = '';
                                    curr_field.fieldOptions = curr_field.manualOptions;
                                }

                                // Have to insert back at same spot if it is an edit
                                var indexToInsert = -1;

                                // Remove duplicate first
                                if (curr_field.globalId != undefined) {
                                    for (var i = 0; i < $scope.myform.form_fields.length; i++) {
                                        var field = $scope.myform.form_fields[i];
                                        if (field.globalId == curr_field.globalId) {
                                            $scope.myform.form_fields.splice(i, 1);
                                            indexToInsert = i;
                                        }
                                    }
                                }
                                if (indexToInsert >= 0) {
                                    $scope.myform.form_fields.splice(indexToInsert, 0, curr_field);
                                } else {
                                    $scope.myform.form_fields.push(curr_field);
                                }
                                $scope.$parent.update(false, $scope.$parent.myform, true, function(){
                                    $uibModalInstance.close();
                                });

                            };
                            $scope.cancel = function(){
                                $uibModalInstance.close();
                            };
                        }
                    });
                };
    }
]);

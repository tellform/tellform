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

        $scope.validate_emails = function(emails, agencyForm) {
            var emails_arr = emails.split(',');
            var re = /^(?!:\/\/)(^[a-zA-Z0-9])?.[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
            for (var i = 0; i < emails_arr.length; i++) { 
                if (re.test(emails_arr[i]) == false) {
                    agencyForm.emailDomain.$setValidity("text", false);
                    return
                }
            }
            agencyForm.emailDomain.$setValidity("text", true);
        };

        getPage();

        $scope.openEditModal = function(){$scope.editFieldModal = $uibModal.open({
            animation: true,
            templateUrl: 'editFieldModal.html',
            windowClass: 'edit-modal-window',
                controller:  function($uibModalInstance, $scope) {
                    var reader = new FileReader();

                    $scope.loadOptions = function(currField, files) {
                        // if (currField.fieldType === 'dropdown') {
                        //     var optionsFile = files[0];
                        //     currField.fieldOptionsFile = optionsFile.name;
                        //     currField.loadProgress = 0;

                        //     reader.onload = function(e) {
                        //         var fileContent = e.target.result;
                        //         var options = fileContent.split('\n').map(option => option.trim());
                        //         var uniq_options = [...new Set(options)];

                        //         currField.fileOptions = [];

                        //         for (let option of uniq_options) {
                        //             if (option) {
                        //                 currField.fileOptions.push(option);
                        //             }
                        //         }

                        //         var progress = document.querySelector('.load-file-progress');
                        //         progress.classList.remove('active');
                        //     }

                            

                        //     reader.readAsText(optionsFile);
                        // }
                    };

                    $scope.saveField = function() {
                        console.log('in save field')
                        console.log($scope.agency)

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
                                $uibModalInstance.close();
                            }).error(function(errorResponse){
                                console.error(errorResponse);
                                $scope.error = errorResponse.data.message;
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

'use strict';

// Admin Panel controller
angular.module('forms').controller('AdminPanelController', ['$scope', '$rootScope', '$http', 'Forms', '$stateParams', '$uibModal',
    function($rootScope, $scope, $http, Forms, $stateParams, $uibModal) {

        $scope.gridOptions = {
            rowHeight:45
        };

          // multiSelect: false,
          //   noUnselect: true,
          //   enableSelectAll: false
    //       ,
          
    //             enableFullRowSelection: true,
    // enableRowHeaderSelection: true

        $scope.gridOptions = {
            
            columnDefs: [{
                    name: 'Reference Number',
                    field: '_id',
                    enableCellEdit: false,
                    enableColumnMenu: false,
                    visible: false
                },
                {
                    name: 'Full Name',
                    field: 'fullName',
                    enableColumnMenu: false,
                    enableCellEdit: false
                },
                {
                    name: 'Short Name',
                    field: 'shortName',
                    enableColumnMenu: false,
                    enableCellEdit: false
                },
                {
                    name: 'Email Domain',
                    field: 'emailDomain',
                    enableColumnMenu: false,
                    enableCellEdit: false
                },
                {
                    name: 'Logo',
                    field: 'logo',
                    enableColumnMenu: false,
                    enableCellEdit: false
                }
            ],
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;

                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    console.log('rows selected')
                    console.log(row)
                    $scope.selectedRows = $scope.gridApi.selection.getSelectedRows();
                    console.log($scope.selectedRows)
                    if ($scope.selectedRows.length === 1){
                        $scope.agency = row.entity;
                    } else {
                        $scope.agency = null;
                    }
                });
            }
        };

        var getPage = function() {
            $http.get('/agencies')
                .success(function(response) {
                    $scope.gridOptions.data = response;
                })
                .error(function(err) {
                    console.error(err);
                    $scope.error = err.message;
                });
        };

        $scope.validate_emails = function(emails, agencyForm) {
            var emails_arr = emails.split(',');
            var re = /[a-zA-Z0-9-]+.[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
            for (var i = 0; i < emails_arr.length; i++) { 
                if (re.test(emails_arr[i]) == false) {
                    agencyForm.emailDomain.$setValidity("text", false);
                    return
                }
            }
            agencyForm.emailDomain.$setValidity("text", true);
        };

        getPage();

        $scope.openEditModal = function(createNew){$scope.editFieldModal = $uibModal.open({
            animation: true,
            templateUrl: 'editFieldModal.html',
            windowClass: 'edit-modal-window',
                controller:  function($uibModalInstance, $scope) {

                    if (createNew) {
                        $scope.agency = null;
                    }

                    $scope.saveAgency = function() {

                        if (createNew) {
                            $http.post('/agencies', {agency: $scope.agency})
                                .success(function(data, status, headers){
                                    $scope.agency._id = data._id
                                    $scope.gridOptions.data.unshift($scope.agency);
                                    $uibModalInstance.close();
                                }).error(function(errorResponse){
                                    console.error(errorResponse);
                                    $scope.error = errorResponse.data.message;
                                });
                        } else {

                            $http.put('/agencies', {agency: $scope.agency})
                                .success(function(data, status, headers){
                                    $uibModalInstance.close();
                                }).error(function(errorResponse){
                                    console.error(errorResponse);
                                });
                        }

                                            };
                    $scope.cancel = function(){
                        $uibModalInstance.close();
                    };
                }
        })};

        $scope.deleteAgency = function() {

            console.log('in delete agency client call')
            console.log($scope.agency)

            $http.delete('/agencies', {agency: $scope.agency})
                .success(function(data, status, headers){
                }).error(function(errorResponse){
                    console.error(errorResponse);
                });
        }
    }
]);

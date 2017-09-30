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
            enableRowHeaderSelection: true,
            enableFullRowSelection: true,
            enableSelectAll: true,
        };

        $scope.gridOptions = {
            
            columnDefs: [{
                    name: 'Reference Number',
                    field: '_id'
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

                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.agency = row.entity
                    $scope.openEditModal(false)
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

                    $scope.saveField = function() {

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

                            $http.put('/agencies', {agency_id: $scope.agency._id, agency_field: $scope.agency})
                                .success(function(data, status, headers){
                                    console.log('agency update was a success')
                                    $uibModalInstance.close();
                                }).error(function(errorResponse){
                                    console.log('agency update was a failure')
                                    console.error(errorResponse);
                                });
                        }

                                            };
                    $scope.cancel = function(){
                        $uibModalInstance.close();
                    };
                }
            });
        };
    }
]);

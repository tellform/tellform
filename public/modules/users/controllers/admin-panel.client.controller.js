'use strict';

// Admin Panel controller
angular.module('users').controller('AdminPanelController', ['$scope', '$rootScope', '$http', '$uibModal', 'User',
    function($rootScope, $scope, $http, $uibModal, User) {

        $scope.isSuperAdmin = false
        User.getCurrent().then(function(myUser) {
            if (myUser.roles.includes('superAdmin')) {
                $scope.isSuperAdmin = true;
            }
        });

        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter:true
        };

        $scope.editAgency = function(row){$scope.editFieldModal = $uibModal.open({
            animation: true,
            templateUrl: 'editFieldModal.html',
            windowClass: 'edit-modal-window',
            controller:  function($uibModalInstance, $scope) {

                $scope.agency = row.entity

                $scope.saveAgency = function() {

                    $http.put('/agencies', {agency: $scope.agency})
                    .success(function(data, status, headers){
                        $uibModalInstance.close();
                    }).error(function(errorResponse){
                        console.error(errorResponse);
                    });

                };
                $scope.cancel = function(){
                    $uibModalInstance.close();
                };
            }
        })};

        $scope.createAgency = function(){$scope.editFieldModal = $uibModal.open({
            animation: true,
            templateUrl: 'editFieldModal.html',
            windowClass: 'edit-modal-window',
            controller:  function($uibModalInstance, $scope) {

                $scope.agency = null;

                $scope.saveAgency = function() {

                    $http.post('/agencies', {agency: $scope.agency})
                        .success(function(data, status, headers){
                            $scope.agency._id = data._id
                            $scope.gridOptions.data.unshift($scope.agency);
                            $uibModalInstance.close();
                        }).error(function(errorResponse){
                            console.error(errorResponse);
                        });

                };
                $scope.cancel = function(){
                    $uibModalInstance.close();
                };
            }
        })};

        $scope.gridOptions.columnDefs = [{
            name: 'Reference Number',
            field: '_id',
            enableCellEdit: false,
            enableColumnMenu: false,
            visible: false        },
        {
            name: 'Full Name',
            field: 'fullName',
            enableColumnMenu: false,
            enableCellEdit: false,
            cellTemplate: '<div ng-click="grid.appScope.editAgency(row)" onmouseover="" style="cursor: pointer;" class="ui-grid-cell-contents">{{row.entity.fullName}}</div>'
        },
        {
            name: 'Short Name',
            field: 'shortName',
            enableColumnMenu: false,
            enableCellEdit: false,
            cellTemplate: '<div ng-click="grid.appScope.editAgency(row)" onmouseover="" style="cursor: pointer;" class="ui-grid-cell-contents">{{row.entity.shortName}}</div>'
        },
        {
            name: 'Email Domain',
            field: 'emailDomain',
            enableColumnMenu: false,
            enableCellEdit: false,
            cellTemplate: '<div ng-click="grid.appScope.editAgency(row)" onmouseover="" style="cursor: pointer;" class="ui-grid-cell-contents">{{row.entity.emailDomain}}</div>'
        },
        {
            name: 'Logo',
            field: 'logo',
            enableColumnMenu: false,
            enableCellEdit: false,
            cellTemplate: '<div ng-click="grid.appScope.editAgency(row)" onmouseover="" style="cursor: pointer;" class="ui-grid-cell-contents">{{row.entity.logo}}</div>'
        }
        ];

        $scope.gridOptions.multiSelect = true;

        var getPage = function() {
            $http.get('/agencies')
                .success(function(response) {
                    $scope.gridOptions.data = response;
                })
                .error(function(err) {
                    console.error(err);
                });
        };
        getPage();      

        $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                $scope.selectedRows = gridApi.selection.getSelectedRows();
            });
        }

        $scope.validate_emails = function(emails, agencyForm) {
            var emails_arr = emails.split(',');
            var re = /.+\..+/;
            for (var i = 0; i < emails_arr.length; i++) { 
                if (re.test(emails_arr[i]) == false) {
                    agencyForm.emailDomain.$setValidity("text", false);
                    return
                }
            }
            agencyForm.emailDomain.$setValidity("text", true);
        };

        $scope.deleteAgency = function() {

            $http({
                    url: '/agencies',
                    method: 'DELETE',
                    data: {
                        agency_ids: $scope.selectedRows.map(row => row._id)
                    },
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).success(function(data, status) {
                    $scope.gridApi.selection.clearSelectedRows();
                    getPage();   
                })
                .error(function(err) {
                    console.error(err);
                });

        }
    }]);

'use strict';

// Admin Panel controller
angular.module('forms').controller('AdminPanelController', ['$scope', '$rootScope', '$http', 'Forms', '$stateParams',
    function($rootScope, $scope, $http, Forms, $stateParams) {

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
                    $scope.$apply();

                    // $scope.updatePromise = $http.put('/forms/' + $scope.myform.admin.agency.shortName + '/' + $scope.myform._id, {form: dataToSend})
                    // .then(function (response) {
                    //     $scope.success = 'Changes Saved!'
                    //     if (refreshAfterUpdate) $rootScope.myform = $scope.myform = response.data;




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


        $scope.deleteSubmissions = function() {
            var submission_ids = $scope.selectedRows.map(row => row._id);

            $http({
                    url: '/forms/' + $scope.myform.admin.agency.shortName + '/' + $scope.myform._id + '/submissions',
                    method: 'DELETE',
                    data: {
                        submission_ids: submission_ids
                    },
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).success(function(data, status) {
                    getPage();
                })
                .error(function(err) {
                    console.error(err);
                    $scope.error = err.message;
                });
        };

        // var startDateFilter = $( ".start-date-filter" );
        // var endDateFilter = $( ".end-date-filter" );

        // $scope.dateFilterChanged = function() {
        //     if($scope.startDate) {
        //         endDateFilter.datepicker( 'option', 'minDate', $scope.startDate );
        //         // getPageOptions.startDate = $scope.startDate;
        //     }

        //     if($scope.endDate) {
        //         startDateFilter.datepicker( 'option', 'maxDate', $scope.endDate );
        //         // getPageOptions.endDate = $scope.endDate;
        //     }
        //     getPage();
        // };

        // $scope.clearStartDate = function() {
        //     $scope.startDate = undefined;
        //     endDateFilter.datepicker( 'option', 'minDate', null );
        //     // delete getPageOptions.startDate;
        //     getPage();
        // }

        // $scope.clearEndDate = function() {
        //     $scope.endDate = undefined;
        //     startDateFilter.datepicker( 'option', 'maxDate', null );
        //     // delete getPageOptions.endDate;
        //     getPage();
        // }

        getPage();
    }
]);

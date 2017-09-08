'use strict';

angular.module('forms').directive('editSubmissionsDirective', ['$rootScope', '$http', 'Forms', '$stateParams', '$interval', 'uiGridConstants',
	function($rootScope, $http, Forms, $stateParams, $interval, uiGridConstants) {
		return {
			templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions.client.view.html',
			restrict: 'E',
			scope: {
				user: '=',
				myform: '='
			},
			controller: function($scope) {
				var DEFAULT_PAGE_SIZE = 20;

				var paginationOptions = {
					pageNumber: 1,
					pageSize: DEFAULT_PAGE_SIZE,
					sortField: 'created',
					sortDirection: -1
				};

				$scope.gridOptions = {
					enableColumnMenus: false,
					enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
					enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,

					enableRowHeaderSelection: true,
					enableFullRowSelection: true,
					enableSelectAll: true,
					multiSelect: true,

					paginationPageSize: DEFAULT_PAGE_SIZE,
					paginationPageSizes: [ DEFAULT_PAGE_SIZE ],
					useExternalPagination: true,

					useExternalSorting: true,

					columnDefs: [{
							name: 'Reference Number',
							field: '_id',
							enableCellEdit: false,
							enableSorting: true,
							sortDirectionCycle: [ uiGridConstants.ASC, uiGridConstants.DESC ],
							width: '50%',
							minWidth: 250
						},
						{
							name: 'Submission Time',
							field: 'created',
							enableCellEdit: false,
							enableSorting: true,
							sort: { direction: uiGridConstants.DESC },
							defaultSort: { direction: uiGridConstants.DESC },
							sortDirectionCycle: [ uiGridConstants.ASC, uiGridConstants.DESC ],
							width: '50%',
							minWidth: 250
						}
					],
					onRegisterApi: function(gridApi) {
						$scope.gridApi = gridApi;

						gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
							if (sortColumns.length == 0) {
								paginationOptions.sortField = null;
								paginationOptions.sortDirection = null;
							} else {
								paginationOptions.sortField = sortColumns[0].field;
								paginationOptions.sortDirection = sortColumns[0].sort.direction === 'asc' ? 1 : -1;
							}
							getPage();
						});

						gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
							paginationOptions.pageNumber = newPage;
							paginationOptions.pageSize = pageSize;
							getPage();
						});

						gridApi.selection.on.rowSelectionChanged($scope, function(row) {
							$scope.selectedRows = gridApi.selection.getSelectedRows();
						});

						gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
							$scope.selectedRows = gridApi.selection.getSelectedRows();
						});
					}
				};

				var getPage = function() {
					$http.get('/forms/' + $scope.user.agency.shortName + '/' + $scope.myform._id + '/submissions/count')
						.success(function(response) {
							$scope.gridOptions.totalItems = response;
						})
						.error(function(err) {
							console.error(err);
							$scope.error = err.message;
						});

					$http.get('/forms/' + $scope.user.agency.shortName + '/' + $scope.myform._id + '/submissions', { params: paginationOptions })
						.success(function(response) {
							$scope.gridOptions.data = response;
						})
						.error(function(err) {
							console.error(err);
							$scope.error = err.message;
						});
				};

				$scope.deleteSubmissions = function() {
					var submission_ids = $scope.selectedRows.map(row => row._id);

					$http({
							url: '/forms/' + $scope.user.agency.shortName + '/' + $scope.myform._id + '/submissions',
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

				getPage();
			}
		};
	}
]);

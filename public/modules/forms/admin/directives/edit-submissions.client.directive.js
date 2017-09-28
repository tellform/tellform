'use strict';

angular.module('forms').directive('editSubmissionsDirective', ['$rootScope', '$http', 'Forms', '$stateParams', '$interval', 'uiGridConstants', 'moment',
	function($rootScope, $http, Forms, $stateParams, $interval, uiGridConstants, moment) {
		return {
			templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions.client.view.html',
			restrict: 'E',
			scope: {
				user: '=',
				myform: '='
			},
			controller: function($scope) {
				var DEFAULT_PAGE_SIZE = 20;

				var getPageOptions = {
					pageNumber: 1,
					pageSize: DEFAULT_PAGE_SIZE,
					sortField: 'created',
					sortDirection: -1
				};

				$scope.dateOptions = {
					changeYear: true,
					changeMonth: true,
					dateFormat: 'dd M yy',
					yearRange: '1900:+0'
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
								getPageOptions.sortField = null;
								getPageOptions.sortDirection = null;
							} else {
								getPageOptions.sortField = sortColumns[0].field;
								getPageOptions.sortDirection = sortColumns[0].sort.direction === 'asc' ? 1 : -1;
							}
							getPage();
						});

						gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
							getPageOptions.pageNumber = newPage;
							getPageOptions.pageSize = pageSize;
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
					$scope.selectedRows = undefined;

					$http.get('/forms/' + $scope.myform.admin.agency.shortName + '/' + $scope.myform._id + '/submissions/count', { params: getPageOptions })
						.success(function(response) {
							$scope.gridOptions.totalItems = response;
						})
						.error(function(err) {
							console.error(err);
							$scope.error = err.message;
						});

					$http.get('/forms/' + $scope.myform.admin.agency.shortName + '/' + $scope.myform._id + '/submissions', { params: getPageOptions })
						.success(function(response) {
							$scope.gridOptions.data = response.map(submission => {
								submission.created = moment(submission.created).tz('Asia/Singapore').format('DD MMM YYYY hh:mm:ss A');
								return submission;
							});
						})
						.error(function(err) {
							console.error(err);
							$scope.error = err.message;
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

				var startDateFilter = $( ".start-date-filter" );
				var endDateFilter = $( ".end-date-filter" );

				$scope.dateFilterChanged = function() {
					if($scope.startDate) {
						endDateFilter.datepicker( 'option', 'minDate', $scope.startDate );
						getPageOptions.startDate = $scope.startDate;
					}

					if($scope.endDate) {
						startDateFilter.datepicker( 'option', 'maxDate', $scope.endDate );
						getPageOptions.endDate = $scope.endDate;
					}
					getPage();
				};

				$scope.clearStartDate = function() {
					$scope.startDate = undefined;
					endDateFilter.datepicker( 'option', 'minDate', null );
					delete getPageOptions.startDate;
					getPage();
				}

				$scope.clearEndDate = function() {
					$scope.endDate = undefined;
					startDateFilter.datepicker( 'option', 'maxDate', null );
					delete getPageOptions.endDate;
					getPage();
				}

				getPage();
			}
		};
	}
]);

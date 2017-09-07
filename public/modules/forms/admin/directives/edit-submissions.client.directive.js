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
				var paginationOptions = {
					pageNumber: 1,
					pageSize: 10,
					sort: null
				};

				$scope.gridOptions = {
					enableColumnMenus: false,
					enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
					paginationPageSize: 10,
					useExternalPagination: true,
					useExternalSorting: true,

					columnDefs: [{
							name: 'Reference Number',
							field: '_id',
							enableCellEdit: false,
							width: '50%',
							minWidth: 250
						},
						{
							name: 'Submission Time',
							field: 'created',
							enableCellEdit: false,
							width: '50%',
							minWidth: 250
						}
					],
					onRegisterApi: function(gridApi) {
						$scope.gridApi = gridApi;
						$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
							if (sortColumns.length == 0) {
								paginationOptions.sort = null;
							} else {
								paginationOptions.sort = sortColumns[0].sort.direction;
							}
							getPage();
						});
						gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
							paginationOptions.pageNumber = newPage;
							paginationOptions.pageSize = pageSize;
							getPage();
						});
					}
				};

				var getPage = function() {
					$http.get('/forms/' + $scope.myform._id + '/submissions/count')
						.success(function(response) {
							$scope.gridOptions.totalItems = response;
						})
						.error(function(err) {
							console.error(err);
							$scope.error = err.message;
						});

					$http.get('/forms/' + $scope.myform._id + '/submissions')
						.success(function(response) {
							$scope.gridOptions.data = response;
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

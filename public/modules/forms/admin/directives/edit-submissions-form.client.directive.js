'use strict';

angular.module('forms').directive('editSubmissionsFormDirective', ['$rootScope', '$http',
    function ($rootScope, $http) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/edit-submissions-form.client.view.html',
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

				(function initController(){

					var defaultFormFields = _.cloneDeep($scope.myform.form_fields);

					//Iterate through form's submissions

					var submissions = _.cloneDeep($scope.myform.submissions);
					for(var i = 0; i < submissions.length; i++){
						for(var x = 0; x < submissions[i].form_fields; x++){
							var oldValue = submissions[i].form_fields[x].fieldValue || '';
							submissions[i].form_fields[x] =  _.merge(defaultFormFields, submissions[i].form_fields);
							submissions[i].form_fields[x].fieldValue = oldValue;
						}
						submissions[i].selected = false;
					}
					// console.log('after textField2: '+data[0].form_fields[1].fieldValue);

					$scope.table.rows = submissions;

					// console.log('form submissions successfully fetched');
					// console.log( JSON.parse(JSON.stringify($scope.submissions)) ) ;
					// console.log( JSON.parse(JSON.stringify($scope.myform.form_fields)) );

				})();

				/*
				** Analytics Functions
				*/
				$scope.AverageTimeElapsed = (function(){
					var totalTime = 0;
					var numSubmissions = $scope.table.rows.length;

					for(var i=0; i<$scope.table.rows.length; i++){
						totalTime += $scope.table.rows[i].timeElapsed;
					}

					console.log(totalTime/numSubmissions);
					return totalTime/numSubmissions;
				})();

				$scope.DeviceStatistics = (function(){
					var newStatItem = function(){
						return {
							visits: 0,
							responses: 0,
							completion: 0,
							average_time: 0,
							total_time: 0
						};
					};

					var stats = {
						desktop: newStatItem(),
						tablet: newStatItem(),
						phone: newStatItem(),
						other: newStatItem()
					};

					var visitors = $scope.myform.analytics.visitors;

					console.log(visitors);
					for(var i=0; i<visitors.length; i++){
						var visitor = visitors[i];
						var deviceType = visitor.deviceType;

						stats[deviceType].visits++;

						stats[deviceType].total_time =+ visitor.timeElapsed;
						stats[deviceType].average_time = stats[deviceType].total_time/stats[deviceType].visits || 0;

						if(visitor.isSubmitted) stats[deviceType].responses++;

						stats[deviceType].completion = stats[deviceType].response/stats[deviceType].visits || 0;
					}

					console.log(stats);
					return stats;
				})();

                /*
                ** Table Functions
                */
                $scope.isAtLeastOneChecked = function(){
                    for(var i=0; i<$scope.table.rows.length; i++){
                        if($scope.table.rows[i].selected) return true;
                    }
                    return false;
                };
                $scope.toggleAllCheckers = function(){
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

                //Fetch and display submissions of Form

                //Delete selected submissions of Form
                $scope.deleteSelectedSubmissions = function(){

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
                        'csv': 'csv'
                    };

					console.log($scope.table.rows);

					angular.element('#table-submission-data').tableExport({type: type, escape:false});

					/*
                    var blob = new Blob([$scope.table.rows], {
                            type: 'application/'+fileMIMETypeMap[type]+';charset=utf-8'
                    });
                    saveAs(blob, $scope.myform.title+'_sumbissions_export_'+Date.now()+'.'+type);
                    */
                };

            }
        };
    }
]);

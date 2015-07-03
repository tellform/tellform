'use strict';

// Forms controller
angular.module('forms').controller('ViewFormController', ['$scope', '$stateParams', '$state', 'Forms', 'CurrentForm','$http',
	function($scope, $stateParams, $state, Forms, CurrentForm, $http) {

        // view form submissions
        $scope.form = CurrentForm.getForm();
        $scope.submissions = undefined;
        $scope.viewSubmissions = false;
        $scope.table = {
            masterChecker: true,
            rows: []
        };


        //Table Functions
        $scope.toggleAllCheckers = function(){
            console.log('toggleAllCheckers');
            for(var i=0; i<$scope.table.rows.length; i++){
                table.rows[i].selected = $scope.table.masterChecker;
            }
        }
        $scope.toggleObjSelection = function($event, description) {
            $event.stopPropagation();
           console.log('checkbox clicked');
       }

       $scope.rowClicked = function(obj) {
           console.log('row clicked');
           obj.selected = !obj.selected;
       };

        //show submissions of Form
        $scope.showSubmissions = function(){
        	$scope.viewSubmissions = true;
            if(!$scope.table.rows.length){
                $http.get('/forms/'+$scope.form._id+'/submissions')
                    .success(function(data, status, headers){
                        console.log(data);
                        $scope.submissions = data;
                        $scope.table.rows = data; 
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });            
            } else if(!$scope.submissions.length){
                $http.get('/forms/'+$scope.form._id+'/submissions')
                    .success(function(data, status, headers){
                        $scope.submissions = data;
                        $scope.table.rows = data;
                        console.log($scope.table.rows);
                        console.log('form submissions successfully fetched');
                    })
                    .error(function(err){
                        console.log('Could not fetch form submissions.\nError: '+err);
                    });
            }
            console.log($scope.submissions);
        };

        //hide submissions of Form
        $scope.hideSubmissions = function(){
        	$scope.viewSubmissions = false;
        };

		// Return all user's Forms
		$scope.findAll = function() {
			$scope.forms = Forms.query();
            console.log($scope.forms);
		};

		// Find a specific Form
		$scope.findOne = function() {
			$scope.form = Forms.get({
				formId: $stateParams.formId
			});
			CurrentForm.setForm($scope.form);
		};

        // Remove existing Form
        $scope.remove = function() {

            var form = CurrentForm.getForm();
            if(!form) form = $scope.form; 
            
            $http.delete('/forms/'+$scope.form._id)
                .success(function(data, status, headers){
                    console.log('form deleted successfully');
                    alert('Form deleted..');
                    $state.go('listForms');
                }).error(function(error){
                    console.log('ERROR: Form could not be deleted.');
                    console.error(error);
                });

        };
	}
]);
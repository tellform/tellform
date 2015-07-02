'use strict';

// submissions controller
angular.module('forms').controller('ViewSubmissionController', ['$scope', '$stateParams', '$state', 'Submissions','$http',
	function($scope, $stateParams, $state, Submissions, $http) {
		$scope.submissionId = undefined;

		// Principal.identity().then(function(user){
  //           $scope.authentication.user = user;
  //       }).then(function(){
		

			// Return all form's submissions
			$scope.findAll = function() {
				$scope.submissions = Submissions.query({
					formId: $stateParams.formId
				});
			};

			// Find a specific submission
			$scope.findOne = function() {
				$scope.submission = Submissions.get({
					submissionId: $scope.submissionId,
					formId: $stateParams.formId
				});
			};

            
            // Remove existing submission
            $scope.remove = function(submission) {
                if (submission) {
                    submission.$remove();

                    $http.delete('/forms/'+$stateParams.formId+'submissions/'+$scope.submission._id).
                    	success(function(data, status, headers){
	                        console.log('submission deleted successfully');
	                        alert('submission deleted..');
	                    });

                } else {
                    $scope.submission.$remove(function() {
                    	console.log('remove');
                        $state.path('submissions');
	                    $http.delete('/forms/'+$stateParams.formId+'/submissions/'+$scope.submission._id).
	                    	success(function(data, status, headers){
		                        console.log('submission deleted successfully');
		                        alert('submission deleted..');
		                    });
                    });
                }
            };

            
		// });
	}
]);
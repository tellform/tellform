'use strict';

// Forms controller
angular.module('forms').controller('SubmitFormController', ['$scope', '$stateParams', '$state', 'Forms', 'CurrentForm',
	function($scope, $stateParams, $state, Forms, CurrentForm) {
		
		$scope.form = Forms.get({
			formId: $stateParams.formId
		});
		CurrentForm.setForm($scope.form);
	}
]);
'use strict';

// SubmitForm controller
angular.module('view-form').controller('SubmitFormController', [
	'$scope', '$rootScope', '$state', '$translate', 'myForm',
	function($scope, $rootScope, $state, $translate, myForm) {
		$scope.myform = myForm;
        $translate.use(myForm.language);
	}
]);

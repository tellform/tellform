'use strict';

// SubmitForm controller
angular.module('view-form').controller('SubmitFormController', [
	'$scope', '$rootScope', '$state', '$translate', 'myForm',
	function($scope, $rootScope, $state, $translate, myForm) {
		$scope.myform = myForm;

		$(".loader").fadeOut("slow");
		document.body.style.background = myForm.design.colors.backgroundColor;
        $translate.use(myForm.language);
	}
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Principal',
	function($scope, Principal) {
		// This provides Principal context.
		$scope.authentication = Principal;
		$scope.authentication.user = undefined;
		Principal.identity().then(function(user){
			$scope.authentication.user = user;
		});
		// console.log("user.displayName: "+Principal.user()._id);

	}
]);
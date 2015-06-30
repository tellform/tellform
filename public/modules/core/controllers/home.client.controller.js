'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Principal',
	function($scope, Principal) {
		// This provides Principal context.
		$scope.authentication = Principal;

		console.log($scope.authentication.user);
		Principal.identity().then(function(user){
			console.log(user);
			$scope.authentication.user = user;
		}, function(){
			console.log('error');
		});
		// console.log("user.displayName: "+Principal.user()._id);

	}
]);
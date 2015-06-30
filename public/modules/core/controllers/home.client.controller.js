'use strict';


angular.module('core').controller('HomeController', ['$rootScope', '$scope',
	function($rootScope, $scope) {
		// This provides Principal context.
		// $scope.authentication = Principal;
		// $scope.user = {};

		// $rootScope.user = $window.user;
		console.log($rootScope.user);

		// Principal.identity().then(function(user){
		// 	console.log(user);
		// 	$scope.user = user;
		// }, function(){
		// 	console.log('error');
		// });
		// console.log("user.displayName: "+Principal.user()._id);

	}
]);
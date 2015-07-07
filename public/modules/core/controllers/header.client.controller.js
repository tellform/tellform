'use strict';

angular.module('core').controller('HeaderController', ['$rootScope','$scope','Menus', '$state', 'Auth', 'User',
	function ($rootScope, $scope, Menus, $state, Auth, User) {
		$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);
	    $scope.authentication = $rootScope.authentication = Auth;
		$rootScope.languages = $scope.languages = ['english', 'french', 'spanish'];

		$scope.isCollapsed = false;
		$scope.hideNav = false;
		$scope.menu = Menus.getMenu('topbar');

	    $scope.signout = function() {
		    var promise = User.logout();
			promise.then(function() {
				Auth.logout();
				// Auth.ensureHasCurrentUser(null);
				$rootScope.user = null;
				$state.go('home');
				}, 
			function(reason) {
			  	console.log('Logout Failed: ' + reason);
			});
	    };

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$scope.isCollapsed = false;
			$scope.hideNav = false;
			if ( angular.isDefined( toState.data ) ) {

				if ( angular.isDefined( toState.data.hideNav ) ) {
		        	$scope.hideNav = toState.data.hideNav;
		        }
		    }
		});

		// Principal.identity().then(function(user){
		// 	$rootScope.user = user;
		// 	console.log('topbar')
		// 	console.log($scope.user);
		// },
		// function(error){
		// 	console.log(error);
		// }).then(function(){
			// $scope.signout = function() {
			// 	$http.get('/auth/signout').success(function(response) {
		 //          $state.go('home');
		 //        }).error(function(error) {
		 //          $scope.error = (error.message || error);
		 //        });
        		
   			//  			Principal.signout().then(
			// 		function(result){
			// 			$state.go('home');
			// 		},
			// 		function(error){
			// 			$scope.error = (error.message || error);
			// 		}
			// 	);
			 	// if( angular.isDefined(response_obj.error) ){
				// 	$scope.error = response_obj.error;
				// } else{
				// 	$state.go('home');
				// }

			// };

		// });

	}
]);
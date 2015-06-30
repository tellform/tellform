'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Principal', 'Menus', '$state',
	function($scope, Principal, Menus, $state) {
		$scope.authentication = Principal;
		$scope.isCollapsed = false;
		$scope.hideNav = false;
		$scope.menu = Menus.getMenu('topbar');

		Principal.identity().then(function(user){
			$scope.authentication.user = user;
		}).then(function(){
			$scope.signout = function() {
				// $http.get('/auth/signout').success(function(response) {
		  //         $state.go('home');
		  //       }).error(function(error) {
		  //         $scope.error = (error.message || error);
		  //       });
        		
    			Principal.signout();
				if( angular.isDefined(response_obj.error) ){
					$scope.error = response_obj.error;
				} else{
					$state.go('home');
				}

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
		});

	}
]);
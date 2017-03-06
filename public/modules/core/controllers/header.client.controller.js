'use strict';

angular.module('core').controller('HeaderController', ['$rootScope', '$scope', 'Menus', '$state', 'Auth', 'User', '$window', '$translate', '$locale',
	function ($rootScope, $scope, Menus, $state, Auth, User, $window, $translate, $locale) {

		$rootScope.signupDisabled = $window.signupDisabled;

		$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

	    $scope.authentication = $rootScope.authentication = Auth;

		$rootScope.languages = $scope.languages = ['en', 'fr', 'es', 'it', 'de'];

		//Set global app language
		if($scope.authentication.isAuthenticated()){
			$rootScope.language = $scope.user.language;
		}else {
			$rootScope.language = $locale.id.substring(0,2);
		}
		$translate.use($rootScope.language);

		$scope.isCollapsed = false;
		$rootScope.hideNav = false;
		$scope.menu = Menus.getMenu('topbar');

	    $scope.signout = function() {
		    var promise = User.logout();
			promise.then(function() {
				Auth.logout();
				Auth.ensureHasCurrentUser(User);
				$scope.user = $rootScope.user = null;
				$state.go('listForms');

				//Refresh view
				$state.reload();
			},
			function(reason) {
			  	console.error('Logout Failed: ' + reason);
			});
	    };

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$scope.isCollapsed = false;
			$rootScope.hideNav = false;
			if ( angular.isDefined( toState.data ) ) {

				if ( angular.isDefined( toState.data.hideNav ) ) {
		        	$rootScope.hideNav = toState.data.hideNav;
		        }
		    }
		});

	}
]);

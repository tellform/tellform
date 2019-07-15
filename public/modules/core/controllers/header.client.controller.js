'use strict';

angular.module('core').controller('HeaderController', ['$rootScope', '$scope', 'Menus', '$state', 'Auth', 'User', '$window', '$translate',
	function ($rootScope, $scope, Menus, $state, Auth, User, $window, $translate) {

		$rootScope.signupDisabled = $window.signupDisabled;

		Auth.ensureHasCurrentUser().then(function(currUser){
			$scope.user = $rootScope.user = currUser;
		    $scope.authentication = $rootScope.authentication = Auth;

			//Set global app language
			$rootScope.language = $scope.user.language;
			$translate.use($scope.user.language);

			$scope.isCollapsed = false;
			$rootScope.hideNav = false;
			$scope.menu = Menus.getMenu('topbar');

	        $rootScope.languages = ['en', 'fr', 'es', 'it', 'de'];

	        $rootScope.langCodeToWord = {
	            'en': 'English',
	            'fr': 'Français',
	            'es': 'Español',
	            'it': 'Italiàno',
	            'de': 'Deutsch'
	        };

	        $rootScope.wordToLangCode = {
	            'English': 'en',
	            'Français': 'fr',
	            'Español': 'es',
	            'Italiàno': 'it',
	            'Deutsch': 'de'
	        };

		    $scope.signout = function() {
			    var promise = User.logout();
				promise.then(function() {
					Auth.logout();
					$scope.user = $rootScope.user = null;
					$state.go('signin', { reload: true });
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
		}, function(){
			$state.go('signup');
		})


	}
]);

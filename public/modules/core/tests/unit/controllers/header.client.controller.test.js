'use strict';

(function() {
	describe('HeaderController', function() {
		//Initialize global variables
		var scope,
			HeaderController;

		var sampleUser = {
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'test@test.com',
			language: 'en',
			password: 'password',
			provider: 'local',
			roles: ['user'],
			_id: 'ed873933b1f1dea0ce12fab9'
		};

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		//Mock Authentication Service
        beforeEach(module(function($provide) {
            $provide.service('Auth', function() {
                return {
                    ensureHasCurrentUser: function() {
                        return sampleUser;
                    },
                    isAuthenticated: function() {
                        return true;
                    },
                    getUserState: function() {
                        return true;
                    }
                };
            });
        }));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HeaderController = $controller('HeaderController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();
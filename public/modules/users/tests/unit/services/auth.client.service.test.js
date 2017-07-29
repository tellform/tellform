'use strict';

(function() {
	// Forms Controller Spec
	describe('Auth Service Tests', function() {
		// Initialize global variables
		var Auth;

		var sampleUser = {
			firstName: 'Full',
			lastName: 'Name',
			email: 'test@test.com',
			username: 'test@test.com',
			password: 'password',
			provider: 'local',
			roles: ['user'],
			_id: 'ed873933b1f1dea0ce12fab9'
		};


		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});


		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function(_Auth_) {
			Auth = _Auth_;
 		}));

		it('Auth.login() should save user in Auth.currentUser', function() {
			//Run Service Logic to Test
			Auth.login(sampleUser);
			expect(Auth.currentUser).toEqualData(sampleUser);
		});

		it('Auth.logout() should remove saved user', inject(function($window) {
			//Run Service Logic to Test
			Auth.logout();

			expect($window.user).toEqual(null);
			expect(Auth.currentUser).toEqual(null);
			expect(Auth.isAuthenticated()).toBe(false);
			expect(Auth.getUserState().isLoggedIn).toBe(false);
		}));

		it('Auth.getUserState() should fetch current user state', function() {
			//Run Service Logic to Test
			Auth.login(sampleUser);
			var currUserState = Auth.getUserState();

			expect(currUserState.isLoggedIn).toBe(true);

			//Run Service Logic to Test
			Auth.logout();
			currUserState = Auth.getUserState();

			expect(currUserState.isLoggedIn).toBe(false);
		});

		it('Auth.ensureHasCurrentUser() should fetch most current user if it exists in $window, currentUser or fetch it from /users/me', function() {
			Auth.login(sampleUser);

			//Run Service Logic to Test
			var currUser = Auth.ensureHasCurrentUser(sampleUser);

			expect(currUser).not.toEqual(null);
			expect(currUser).toEqualData(sampleUser);
		});

	});
}());
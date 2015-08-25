'use strict';

(function() {
	// Forms Controller Spec
	describe('Authorizer Service Tests', function() {
		// Initialize global variables
		var Authorizer;

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
		beforeEach(inject(function(_Authorizer_) {
			Authorizer = _Authorizer_;
 		}));

		it('Authorizer.canAccess() should return expected values for \'admin\' and \'user\' accounts', function() {
			var sampleAdminUser = _.cloneDeep(sampleUser);
			sampleAdminUser.roles.push('admin');

			//Run Service Logic to Test
			var authenticatorUser = new Authorizer(sampleUser);
			var authenticatorAdmin = new Authorizer(sampleAdminUser);

			expect(authenticatorUser.canAccess('editForm')).toBe(true);
			expect(authenticatorUser.canAccess('editAdminSettings')).toBe(false);
			expect(authenticatorUser.canAccess('viewAdminSettings')).toBe(false);

			expect(authenticatorAdmin.canAccess('editForm')).toBe(true);
			expect(authenticatorAdmin.canAccess('editAdminSettings')).toBe(true);
			expect(authenticatorAdmin.canAccess('viewAdminSettings')).toBe(true);
		});

	});
}());
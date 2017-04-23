'use strict';

(function() {
	// Forms Controller Spec
	describe('User Service Tests', function() {
		// Initialize global variables
		var User,
			$httpBackend;

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

		var sampleVerifyToken = 'WyuAIchArQnstkq5erx0kiTcTbBbgixYeBGtThFmRpcAJNQ2';
		var sampleForgotToken = 'c2e8f74455cdccc454dfef941ff315fa4f7b1f0a';
		var sampleCredentials = {
			username: sampleUser.username,
			password: sampleUser.password
		};

		var samplePasswordDetails = {
			newPassword: sampleUser.password,
			verifyPassword: sampleUser.password
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

		beforeEach(module('stateMock'));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function(_$httpBackend_, _User_) {
			// Point global variables to injected services
			$httpBackend = _$httpBackend_;
			User = _User_;
 		}));

		it('User.login() should send a POST request to /auth/signin', function() {

			//Set POST response
			$httpBackend.expect('POST', '/auth/signin', sampleCredentials).respond(200, sampleUser);

			//Run Service Logic to Test
			User.login(sampleCredentials);

			$httpBackend.flush();
		});

		it('User.logout() should logout user with /auth/signout', function() {

			//Set POST response
			$httpBackend.expect('GET', '/auth/signout').respond(200);

			//Run Service Logic to Test
			User.logout();

			$httpBackend.flush();
		});

		it('User.getCurrent() should fetch user from /users/me', function() {

			//Set POST response
			$httpBackend.expect('GET', '/users/me').respond(200, sampleUser);

			//Run Service Logic to Test
			User.getCurrent();

			$httpBackend.flush();
		});


		it('User.signup() should signup user with /auth/signup', function() {

			//Set POST response
			$httpBackend.expect('POST', '/auth/signup', sampleCredentials).respond(200);

			//Run Service Logic to Test
			User.signup(sampleCredentials);

			$httpBackend.flush();
		});

		it('User.resendVerifyEmail() should send POST request to /auth/verify', function() {

			//Set POST response
			$httpBackend.expect('POST', '/auth/verify', {email: sampleUser.email}).respond(200);

			//Run Service Logic to Test
			User.resendVerifyEmail(sampleUser.email);

			$httpBackend.flush();
		});

		it('User.validateVerifyToken() should send GET request to /auth/verify/:token', function() {

			//Set POST response
			$httpBackend.expect('GET', '/auth/verify/'+sampleVerifyToken).respond(200);

			//Run Service Logic to Test
			expect(function(){ User.validateVerifyToken(sampleVerifyToken); }).not.toThrow();

			$httpBackend.flush();
		});

		it('User.resetPassword() should send GET request to /auth/forgot/:token', function() {

			//Set POST response
			$httpBackend.expect('POST', '/auth/reset/'+sampleForgotToken).respond(200);

			//Run Service Logic to Test
			User.resetPassword(samplePasswordDetails, sampleForgotToken);

			$httpBackend.flush();
		});

		it('User.askForPasswordReset() should send POST request to /auth/forgot', function() {

			//Set POST response
			$httpBackend.expect('POST', '/auth/forgot', sampleCredentials).respond(200, sampleUser);

			//Run Service Logic to Test
			User.askForPasswordReset(sampleCredentials);

			$httpBackend.flush();
		});


	});
}());

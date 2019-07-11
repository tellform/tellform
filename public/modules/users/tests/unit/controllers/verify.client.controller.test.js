'use strict';

(function() {
	// Forms Controller Spec
	describe('Verify Controller Tests', function() {
		// Initialize global variables
		var ctrl,
			scope,
			$httpBackend,
			$stateParams;

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

		var sampleForm = {
			title: 'Form Title',
			admin: 'ed873933b1f1dea0ce12fab9',
			language: 'english',
			form_fields: [
				{fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false}
			],
			_id: '525a8422f6d0f87f0e407a33'
		};

		var sampleCredentials = {
			email: sampleUser.email
		};

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));
		beforeEach(module('module-templates'));

		// Mock currentUser Service
		beforeEach(module(function($provide) {
			$provide.service('currentUser', function() {
				return sampleUser;
			});
		}));

		var thenFunction = function(onFulfilled, onRejected, progressBack){ 
			onFulfilled(sampleForm) 
		};

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$state_, _$stateParams_, _$httpBackend_, Auth, User) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$httpBackend = _$httpBackend_;
			$stateParams = _$stateParams_;

			$httpBackend.whenGET('/forms').respond('');
			$httpBackend.whenGET('/users/me/').respond('');

			// Initialize the Forms controller.

			this.init = function(){
			    ctrl = $controller('VerifyController', {
			      $scope: scope
			    });
			}
 		}));

		it('$scope.resendVerifyEmail should update my user profile if credentials are valid', inject(function(User) {
			scope.credentials = sampleCredentials;
			this.init();

			spyOn(User, 'resendVerifyEmail').and.returnValue({ then: thenFunction });

			//Run Controller Logic to Test
			scope.resendVerifyEmail();

			// Test scope value
			expect(User.resendVerifyEmail).toHaveBeenCalledTimes(1);
			expect(User.resendVerifyEmail).toHaveBeenCalledWith(sampleCredentials.email);
		}));

		it('$scope.validateVerifyToken should update my user profile if credentials are valid', inject(function(User, $stateParams) {
			scope.credentials = sampleCredentials;
			this.init();

			var verifyToken = 'ed8730ce12fab9933b1f1dea';

			$stateParams.token = verifyToken;
			spyOn(User, 'validateVerifyToken').and.returnValue({ then: thenFunction });

			//Run Controller Logic to Test
			scope.validateVerifyToken();

			// Test scope value
			expect(User.validateVerifyToken).toHaveBeenCalledTimes(1);
			expect(User.validateVerifyToken).toHaveBeenCalledWith(verifyToken);
		}));
	});
}());
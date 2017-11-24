'use strict';

(function() {
	// Forms Controller Spec
	describe('Password Controller Tests', function() {
		// Initialize global variables
		var ctrl,
			scope,
			$httpBackend,
			$state;

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
			username: sampleUser.username,
			password: sampleUser.password,
		};

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));
		beforeEach(module('module-templates'));
		beforeEach(module('stateMock'));

		var thenFunction = function(onFulfilled, onRejected, progressBack){ 
			onFulfilled(sampleForm) 
		};

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$state_, _$httpBackend_, Auth, User) {
			// Set a new global scope
			scope = $rootScope.$new();

			scope.credentials = _.cloneDeep(sampleCredentials);
			scope.passwordDetails = {
				newPassword: 'aoeeaoaeo',
				verifyPassword: 'aoeeaoaeo'
			}

			// Point global variables to injected services
			$httpBackend = _$httpBackend_;
			$state = _$state_;

			$httpBackend.whenGET('/forms').respond('');
			$httpBackend.whenGET('/users/me/').respond('');

			// Initialize the Forms controller.

			this.init = function(){
			    ctrl = $controller('PasswordController', {
			      $scope: scope
			    });
			}
 		}));

		it('$scope.resetUserPassword should call User.resetPassword if form is valid', inject(function(User) {
			scope.forms = {
				resetPasswordForm: {
					$valid: true
				}
			};
			this.init();

			//Set $state transition
			$state.expectTransitionTo('reset-success');
			spyOn(User, 'resetPassword').and.returnValue({ then: thenFunction });

			//Run Controller Logic to Test
			scope.resetUserPassword();

			// Test scope value
			expect(User.resetPassword).toHaveBeenCalledTimes(1);
			$state.ensureAllTransitionsHappened();
		}));

		it('$scope.resetUserPassword should not call User.resetPassword if form is invalid', inject(function(User) {
			scope.forms = {
				resetPasswordForm: {
					$valid: false
				}
			};
			this.init();

			//Set $state transition
			spyOn(User, 'resetPassword').and.returnValue({ then: thenFunction });

			//Run Controller Logic to Test
			scope.resetUserPassword();

			// Test scope value
			expect(User.resetPassword).toHaveBeenCalledTimes(0);
		}));

		it('$scope.askForPasswordReset should call User.askForPasswordReset', inject(function(User) {
			this.init();

			spyOn(User, 'askForPasswordReset').and.returnValue({ then: thenFunction });

			//Run Controller Logic to Test
			scope.askForPasswordReset();

			// Test scope value
			expect(User.askForPasswordReset).toHaveBeenCalledTimes(1);
		}));
	});
}());
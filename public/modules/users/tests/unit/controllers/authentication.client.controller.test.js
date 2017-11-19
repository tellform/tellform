'use strict';

(function() {
	// Forms Controller Spec
	describe('Authentication Controller Tests', function() {
		// Initialize global variables
		var ctrl,
			scope,
			$httpBackend,
			$stateParams,
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

		var expectedForm = {
			title: 'Form Title',
			admin: 'ed873933b1f1dea0ce12fab9',
			language: 'english',
			form_fields: [
				{fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false}
			],
			visible_form_fields: [
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
		beforeEach(module('module-templates'));
		beforeEach(module('stateMock'));

		// Mock Users Service
		beforeEach(module(function($provide) {
			$provide.service('User', function($q) {
				return {
					getCurrent: function() {
						return { 
				            then: function(onFulfilled, onRejected, progressBack) {
				            	return onFulfilled(sampleUser);
				            }
			          	};
					},
					login: function(credentials) {
						return { 
				            then: function(onFulfilled, onRejected, progressBack) {
				            	return onFulfilled(sampleUser);
				            }
			          	};
					},
					logout: function() {
						return { 
				            then: function(onFulfilled, onRejected, progressBack) {
				            	return onFulfilled(null);
				            }
			          	};
					},
					signup: function(credentials) {
						return { 
				            then: function(onFulfilled, onRejected, progressBack) {
				            	return onFulfilled(sampleUser);
				            }
			          	};
					}
				};
			});
		}));

		// Mock Authentication Service
		beforeEach(module(function($provide) {
			$provide.service('Auth', function() {
				return {
					_currentUser: null,
				    get currentUser(){
				        return sampleUser
				    },
					login: function(user) {
					},
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

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$state_, _$stateParams_, _$httpBackend_, Auth, User) {
			// Set a new global scope
			scope = $rootScope.$new();
			scope.forms = {
				signinForm: {
					$valid: true
				},
				signupForm: {
					$valid: true
				},
			};

			scope.credentials = _.cloneDeep(sampleCredentials);

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$state = _$state_;

			$httpBackend.whenGET('/forms').respond('');
			$httpBackend.whenGET('/users/me/').respond('');

			// Initialize the Forms controller.

			this.init = function(){
			    ctrl = $controller('AuthenticationController', {
			      $scope: scope
			    });
			}
 		}));

		it('$scope.signin should sign-in in user with valid credentials', inject(function(Auth) {
			this.init();

			//Set $state transition
			$state.expectTransitionTo('listForms');
			spyOn(Auth, 'login');

			//Run Controller Logic to Test
			scope.signin();

			// Test scope value
			expect(Auth.ensureHasCurrentUser()).toEqualData(sampleUser);
			expect(Auth.login).toHaveBeenCalledTimes(1);
			expect(scope.user).toEqualData(sampleUser);

			$state.ensureAllTransitionsHappened();
		}));

		it('$scope.signin should sign-in in user and redirect to previous state', inject(function(Auth) {
			this.init();

			$state.previous = {
				state: {
					name: 'profile'
				},
				fromParams: {}
			}

			//Set $state transition
			$state.expectTransitionTo('profile');
			spyOn(Auth, 'login');

			//Run Controller Logic to Test
			scope.signin();

			// Test scope value
			expect(Auth.ensureHasCurrentUser()).toEqualData(sampleUser);
			expect(Auth.login).toHaveBeenCalledTimes(1);
			expect(scope.user).toEqualData(sampleUser);

			$state.ensureAllTransitionsHappened();
		}));


		it('$scope.signup should sign-up user with valid credentials', inject(function(Auth) {
			this.init();

			//Set $state transition
			$state.expectTransitionTo('signup-success');
			spyOn(Auth, 'isAuthenticated').and.returnValue(false);

			//Run Controller Logic to Test
			scope.signup();

			$state.ensureAllTransitionsHappened();
		}));

		it('$scope.signup should not sign-up user if username is admin', function() {
			scope.credentials.username = 'admin';
			scope.credentials.email = 'test@example.com';
			this.init();

			//Run Controller Logic to Test
			scope.signup();

			expect(scope.error).toEqual('Username cannot be \'admin\'. Please pick another username.');
		});
	});
}());
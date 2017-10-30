'use strict';

(function() {
	// Forms Controller Spec
	describe('Authentication Controller Tests', function() {
		// Initialize global variables
		var AuthenticationController,
			scope,
			$httpBackend,
			$stateParams,
			$location,
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
						var deferred = $q.defer();
						deferred.resolve( JSON.stringify(sampleUser) );
						return deferred.promise;
					},
					login: function(credentials) {
						var deferred = $q.defer();
						if( credentials.password === sampleUser.password && credentials.username === sampleUser.username){
							deferred.resolve( JSON.stringify(sampleUser) );
						}else {
							deferred.resolve('Error: User could not be loggedin');
						}

						return deferred.promise;
					},
					logout: function() {
						var deferred = $q.defer();
						deferred.resolve(null);
						return deferred.promise;
					},
					signup: function(credentials) {
						var deferred = $q.defer();
						if( credentials.password === sampleUser.password && credentials.username === sampleUser.username){
							deferred.resolve( JSON.stringify(sampleUser) );
						}else {
							deferred.resolve('Error: User could not be signed up');
						}

						return deferred.promise;
					}
				};
			});
		}));

		// Mock Authentication Service
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

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$state_, _$location_, _$stateParams_, _$httpBackend_, CurrentForm, Forms) {
			// Set a new global scope
			scope = $rootScope.$new();
			scope.abc = 'hello';

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			$state = _$state_;

			// $httpBackend.whenGET(/\.html$/).respond('');
			$httpBackend.whenGET('/users/me/').respond('');

			// Initialize the Forms controller.
			AuthenticationController = $controller('AuthenticationController', { $scope: scope });
 		}));

		it('$scope.signin should sigin in user with valid credentials', inject(function(Auth) {
			
			//Set $state transition 
			// $state.expectTransitionTo('listForms');
			//Set POST response
			// $httpBackend.expect('POST', '/auth/signin', sampleCredentials).respond(200, sampleUser);

			scope.abc = 'sampleCredentials';
			//Run Controller Logic to Test
			scope.signin();

			// $httpBackend.flush();

			// Test scope value
			// expect(Auth.ensureHasCurrentUser()).toEqualData(sampleUser);
		}));


	});
}());
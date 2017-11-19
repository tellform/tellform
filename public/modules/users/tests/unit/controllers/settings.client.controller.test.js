'use strict';

(function() {
	// Forms Controller Spec
	describe('Settings Controller Tests', function() {
		// Initialize global variables
		var ctrl,
			scope,
			$httpBackend,
			$state, 
			$http;

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

		var samplePasswordDetails = {
			newPassword: sampleUser.password,
			verifyPassword: sampleUser.password
		};

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));
		beforeEach(module('module-templates'));

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

		// Mock currentUser Service
		beforeEach(module(function($provide) {
			$provide.service('currentUser', function() {
				return sampleUser;
			});
		}));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$state_, _$httpBackend_, Auth, User, _$http_) {
			// Set a new global scope
			scope = $rootScope.$new();
			scope.passwordDetails = samplePasswordDetails;

			// Point global variables to injected services
			$httpBackend = _$httpBackend_;
			$state = _$state_;
			$http = _$http_;

			$httpBackend.whenGET('/forms').respond('');
			$httpBackend.whenGET('/users/me/').respond('');

			// Initialize the Forms controller.
		    ctrl = $controller('SettingsController', {
		      $scope: scope
		    });
 		}));

 		var thenFunction = function(onFulfilled, onRejected, progressBack){ 
			onFulfilled(sampleForm) 
		};

		it('$scope.updateUserProfile should update my user profile if isValid is TRUE', inject(function($http) {
			spyOn($http, 'put').and.returnValue({then: thenFunction});

			//Run Controller Logic to Test
			scope.updateUserProfile(true);

			expect($http.put).toHaveBeenCalledTimes(1);
			expect($http.put).toHaveBeenCalledWith('/users', sampleUser);

			expect(scope.success).toBeTruthy();
			expect(scope.error).toBeNull();
		}));

		it('$scope.updateUserProfile should NOT update my user profile if isValid is FALSE', function() {

			//Run Controller Logic to Test
			scope.updateUserProfile(false);
	
			$httpBackend.flush();	
		});

		it('$scope.changeUserPassword should update the user\'s password', inject(function($http) {

			spyOn($http, 'post').and.returnValue({then: thenFunction});

			//Run Controller Logic to Test
			scope.changeUserPassword();

			expect(scope.success).toBeTruthy();
			expect(scope.error).toBeNull();
			expect(scope.user).toEqualData(sampleUser);

			expect($http.post).toHaveBeenCalledTimes(1);
			expect($http.post).toHaveBeenCalledWith('/users/password', samplePasswordDetails);
		}));
	});
}());
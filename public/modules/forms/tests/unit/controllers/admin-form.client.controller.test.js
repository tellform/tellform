'use strict';

(function() {
	// Forms Controller Spec
	describe('AdminForm Controller Tests', function() {
		// Initialize global variables
		var AdminFormController,
			createAdminFormController,
			scope,
			$httpBackend,
			$stateParams,
			$location,
			$state,
			$timeout;

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
				{fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false, _id:'56340745f59a6fc9e22028e9'},
                {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
                {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false, _id:'56e90745f5934fc9e22028a6'}
			],
			analytics: {
				visitors: []
			},
			submissions: [],
			_id: '525a8422f6d0f87f0e407a33',
			id:  '525a8422f6d0f87f0e407a33'
		};

		var expectedForm = {
			title: 'Form Title',
			admin: 'ed873933b1f1dea0ce12fab9',
			language: 'english',
			form_fields: [
				{fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false, _id:'56340745f59a6fc9e22028e9'},
                {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
                {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false, _id:'56e90745f5934fc9e22028a6'}
			],
			visible_form_fields: [
				{fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false, _id:'56340745f59a6fc9e22028e9'},
                {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false, _id:'5c9e22028e907634f45f59a6'},
                {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false, _id:'56e90745f5934fc9e22028a6'}
			],
			_id: '525a8422f6d0f87f0e407a33'
		};

		//Mock myForm Service
        beforeEach(module(function($provide) {
            $provide.service('myForm', function($q) {
                return sampleForm;
            });
        }));


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

		//Mock Users Service
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

		var newFakeModal = function(){
			var modal = {
				opened: true,
			    close: function( item ) {
			        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
			        this.opened = false;
			    },
			    dismiss: function( type ) {
			        //The user clicked cancel on the modal dialog, call the stored cancel callback
			        this.opened = false;
			    }, 
			    result: {
				    then: function (cb) {
				    	if(cb && typeof cb === 'function'){
				    		cb();
				    	}
				    }
			    }
			};
			return modal;
		};

		//Mock $uibModal
		beforeEach(inject(function($uibModal) {
			var modal = newFakeModal();
		    spyOn($uibModal, 'open').and.returnValue(modal);
		}));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$state_, _$location_, _$stateParams_, _$httpBackend_, CurrentForm, Forms, _$timeout_) {
			// Set a new global scope
			scope = $rootScope.$new();

			//Set CurrentForm
			CurrentForm.setForm(sampleForm);

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			$state = _$state_;
			$timeout = _$timeout_;

			$httpBackend.whenGET(/\.html$/).respond('');
			$httpBackend.whenGET('/users/me/').respond('');

			// Initialize the Forms controller.
			createAdminFormController = function(){
				return $controller('AdminFormController', { $scope: scope });
			};
 		}));

		it('AdminFormController should fetch current Form when instantiated', inject(function($timeout) {
			$timeout(function() {
				// Run controller functionality
				var controller = createAdminFormController();

				// Test scope value
				expect(scope.myform).toEqualData(sampleForm);
			});
		}));

		it('$scope.removeCurrentForm() with valid form data should send a DELETE request with the id of form', inject(function($timeout, $uibModal) {
			$timeout(function() {
				var controller = createAdminFormController();

				//Set $state transition
				$state.expectTransitionTo('listForms');

				// Set DELETE response
				$httpBackend.expect('DELETE', /^(\/forms\/)([0-9a-fA-F]{24})$/).respond(200, sampleForm);

				//Run controller functionality
				scope.openDeleteModal();
				scope.removeCurrentForm();

				$httpBackend.flush();
				$state.ensureAllTransitionsHappened();
			});
		}));

		it('$scope.update() should send a PUT request with the id of form', inject(function($timeout) {
			$timeout(function() {
				var controller = createAdminFormController();

				//Set PUT response
				$httpBackend.expect('PUT', /^(\/forms\/)([0-9a-fA-F]{24})$/).respond(200, sampleForm);

				//Run controller functionality
				scope.update(false, sampleForm, false, false);

				$httpBackend.flush();
			});
		}));

		it('$scope.openDeleteModal() should open scope.deleteModal', inject(function($timeout) {
			$timeout(function() {
				var controller = createAdminFormController();

				//Run controller functionality
				scope.openDeleteModal();
				expect(scope.deleteModal.opened).toEqual(true);
			});
		}));

		it('$scope.cancelDeleteModal() should close $scope.deleteModal', inject(function($uibModal, $timeout) {
			$timeout(function() {
				var controller = createAdminFormController();

				//Run controller functionality
				scope.openDeleteModal();

				//Run controller functionality
				scope.cancelDeleteModal();
				expect( scope.deleteModal.opened ).toEqual(false);
			});
		}));
	});
}());

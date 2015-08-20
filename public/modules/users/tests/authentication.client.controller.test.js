// 'use strict';

// (function() {
	

// 	// Principal controller Spec for E2E Tests
// 	describe('AuthenticationController E2E Tests', function() {

// 		describe('/signup should work for a unique username', function() {
// 		    beforeEach(function() {
// 		        var ptor = protractor.getInstance();
// 		        ptor.get('http://localhost:3000/#!/signup');
// 		    });
			
// 			it('should show the signup panel on page load', function() {
// 				expect($('section > section.row.auth > .col-md-12.text-center')).toEqual('Signup with your email');
// 			}); 


// 		    //Jasmine it statement : What "it" will do.
// 		    it('Verify that the user is logged in', function() {
// 				//Delete all cookies
// 		        browser.driver.manage().deleteAllCookies();
// 				//Enter UserName
// 		        element.all(by.model('username')).get(0).sendKeys('abc@wingify.com');
// 				//Enter Password
// 		        element(by.model('password')).sendKeys('test');
// 				//Click Submit button
// 		        element(by.css('.login-form button[type="submit"]')).click();
// 				//Wait for the current URL to change to welcome
// 		        browser.driver.wait(function() {
// 		            return browser.driver.getCurrentUrl().then(function(url) {
// 		                return (/welcome/).test(url);
// 		            });
// 		        });
// 		        var firstname = element(by.model('credentials.firstname')),
// 					lastname = element(by.model('credentials.lastname')),
// 					email = element(by.model('credentials.email')),
// 			    	password = element(by.model('credentials.password'));

// 			    email.sendKeys('admin@app.com');
// 			    firstname.sendKeys('admin_first');
// 			    lastname.sendKeys('admin_last');
// 			    password.sendKeys('1234');

// 			    //Click signup button
// 			    element(by.css('.btn.btn-large.btn-primary')).click().then(function () {
// 			        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/signup-success');
// 			    });

				
// 		    });
// 		});
// 	});
	
// 	// Principal controller Spec
// 	describe('AuthenticationController Unit Tests', function() {
// 		// Initialize global variables
// 		var AuthenticationController,
// 			scope,
// 			$httpBackend,
// 			$stateParams,
// 			$location;

// 		beforeEach(function() {
// 			jasmine.addMatchers({
// 				toEqualData: function(util, customEqualityTesters) {
// 					return {
// 						compare: function(actual, expected) {
// 							return {
// 								pass: angular.equals(actual, expected)
// 							};
// 						}
// 					};
// 				}
// 			});
// 		});

// 		// Load the main application module
// 		beforeEach(module(ApplicationConfiguration.applicationModuleName));

// 		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
// 		// This allows us to inject a service but then attach it to a variable
// 		// with the same name as the service.
// 		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
// 			// Set a new global scope
// 			scope = $rootScope.$new();

// 			// Point global variables to injected services
// 			$stateParams = _$stateParams_;
// 			$httpBackend = _$httpBackend_;
// 			$location = _$location_;

// 			// Initialize the Principal controller
// 			AuthenticationController = $controller('AuthenticationController', {
// 				$scope: scope
// 			});
// 		}));


// 		it('$scope.signin() should login with a correct user and password', function() {
// 			// Test expected GET request
// 			$httpBackend.when('POST', '/auth/signin').respond(200, 'Fred');

// 			scope.signin();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.authentication.user).toEqual('Fred');
// 			expect($location.url()).toEqual('/');
// 		});

// 		it('$scope.signin() should fail to log in with nothing', function() {
// 			// Test expected POST request
// 			$httpBackend.expectPOST('/auth/signin').respond(400, {
// 				'message': 'Missing credentials'
// 			});

// 			scope.signin();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.error).toEqual('Missing credentials');
// 		});

// 		it('$scope.signin() should fail to log in with wrong credentials', function() {
// 			// Foo/Bar combo assumed to not exist
// 			scope.authentication.user = 'Foo';
// 			scope.credentials = 'Bar';

// 			// Test expected POST request
// 			$httpBackend.expectPOST('/auth/signin').respond(400, {
// 				'message': 'Unknown user'
// 			});

// 			scope.signin();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.error).toEqual('Unknown user');
// 		});

// 		it('$scope.signup() should register with correct data', function() {
// 			// Test expected GET request
// 			scope.authentication.user = 'Fred';
// 			$httpBackend.when('POST', '/auth/signup').respond(200, 'Fred');

// 			scope.signup();
// 			$httpBackend.flush();

// 			// test scope value
// 			expect(scope.authentication.user).toBe('Fred');
// 			expect(scope.error).toEqual(undefined);
// 			expect($location.url()).toBe('/');
// 		});

// 		it('$scope.signup() should fail to register with duplicate Username', function() {
// 			// Test expected POST request
// 			$httpBackend.when('POST', '/auth/signup').respond(400, {
// 				'message': 'Username already exists'
// 			});

// 			scope.signup();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.error).toBe('Username already exists');
// 		});
// 	});
// }());
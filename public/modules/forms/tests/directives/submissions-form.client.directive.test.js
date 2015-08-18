// 'use strict';

// (function() {
// 	// Forms Controller Spec
// 	describe('SubmissionsFormDirective Tests', function() {
// 		// Initialize global variables
// 		var SubmissionsFormDirective,
// 			scope,
// 			$httpBackend,
// 			$stateParams,
// 			$location;

// 		// The $resource service augments the response object with methods for updating and deleting the resource.
// 		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
// 		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
// 		// When the toEqualData matcher compares two objects, it takes only object properties into
// 		// account and ignores methods.
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

// 		// Then we can start by loading the main application module
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

// 			// Initialize the Forms controller.
// 			FormsController = $controller('AdminFormsController', {
// 				$scope: scope
// 			});
// 		}));

// 		function compileDirective(tpl) {
// 	        // function to compile a fresh directive with the given template, or a default one
// 	        // compile the tpl with the $rootScope created above
// 	        // wrap our directive inside a form to be able to test
// 	        // that our form integration works well (via ngModelController)
// 	        // our directive instance is then put in the global 'elm' variable for further tests
// 	        if (!tpl) tpl = '<div rn-stepper ng-model="testModel"></div></form>';
// 	        tpl = '<form name="form">' + tpl + '</tpl>';
// 	        // inject allows you to use AngularJS dependency injection
// 	        // to retrieve and use other services
// 	        inject(function($compile) {
// 	            var form = $compile(tpl)(scope);
// 	            elm = form.find('div');
// 	        });
// 	        // $digest is necessary to finalize the directive generation
// 	        scope.$digest();
// 	    }

// 	    describe('initialisation', function() {
// 	        // before each test in this block, generates a fresh directive
// 	        beforeEach(function() {
// 	            compileDirective();
// 	        });
// 	        // a single test example, check the produced DOM
// 	        it('should produce 2 buttons and a div', function() {
// 	            expect(elm.find('button').length).toEqual(2);
// 	            expect(elm.find('div').length).toEqual(1);
// 	        });
// 	        it('should check validity on init', function() {
// 	            expect(scope.form.$valid).toBeTruthy();
// 	        });
// 	    });

// 		it('$scope.find() should create an array with at least one article object fetched from XHR', inject(function(Forms) {

// 		}));

// 	});
// }());
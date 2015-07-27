// 'use strict';

// (function() {
// 	// Forms Controller Spec
// 	describe('ViewForm Controller Tests', function() {
// 		// Initialize global variables
// 		var ViewFormController,
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
// 			FormsController = $controller('FormsController', {
// 				$scope: scope
// 			});
// 		}));

// 		it('$scope.find() should create an array with at least one article object fetched from XHR', inject(function(Forms) {
// 			// Create sample article using the Forms service
// 			var sampleArticle = new Forms({
// 				title: 'An Article about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Create a sample Forms array that includes the new article
// 			var sampleForms = [sampleForm];

// 			// Set GET response
// 			$httpBackend.expectGET('Forms').respond(sampleForms);

// 			// Run controller functionality
// 			scope.find();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.Forms).toEqualData(sampleForms);
// 		}));

// 		it('$scope.findOne() should create an array with one article object fetched from XHR using a articleId URL parameter', inject(function(Forms) {
// 			// Define a sample article object
// 			var sampleArticle = new Forms({
// 				title: 'An Article about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Set the URL parameter
// 			$stateParams.articleId = '525a8422f6d0f87f0e407a33';

// 			// Set GET response
// 			$httpBackend.expectGET(/Forms\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

// 			// Run controller functionality
// 			scope.findOne();
// 			$httpBackend.flush();

// 			// Test scope value
// 			expect(scope.article).toEqualData(sampleArticle);
// 		}));

// 		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Forms) {
// 			// Create a sample article object
// 			var sampleArticlePostData = new Forms({
// 				title: 'An Article about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Create a sample article response
// 			var sampleArticleResponse = new Forms({
// 				_id: '525cf20451979dea2c000001',
// 				title: 'An Article about MEAN',
// 				content: 'MEAN rocks!'
// 			});

// 			// Fixture mock form input values
// 			scope.title = 'An Article about MEAN';
// 			scope.content = 'MEAN rocks!';

// 			// Set POST response
// 			$httpBackend.expectPOST('Forms', sampleArticlePostData).respond(sampleArticleResponse);

// 			// Run controller functionality
// 			scope.create();
// 			$httpBackend.flush();

// 			// Test form inputs are reset
// 			expect(scope.title).toEqual('');
// 			expect(scope.content).toEqual('');

// 			// Test URL redirection after the article was created
// 			expect($location.path()).toBe('/Forms/' + sampleArticleResponse._id);
// 		}));

// 		it('$scope.update() should update a valid article', inject(function(Forms) {
// 			// Define a sample article put data
// 			var sampleArticlePutData = new Forms({
// 				_id: '525cf20451979dea2c000001',
// 				title: 'An Article about MEAN',
// 				content: 'MEAN Rocks!'
// 			});

// 			// Mock article in scope
// 			scope.article = sampleArticlePutData;

// 			// Set PUT response
// 			$httpBackend.expectPUT(/Forms\/([0-9a-fA-F]{24})$/).respond();

// 			// Run controller functionality
// 			scope.update();
// 			$httpBackend.flush();

// 			// Test URL location to new object
// 			expect($location.path()).toBe('/Forms/' + sampleArticlePutData._id);
// 		}));

// 		it('$scope.remove() should send a DELETE request with a valid articleId and remove the article from the scope', inject(function(Forms) {
// 			// Create new article object
// 			var sampleArticle = new Forms({
// 				_id: '525a8422f6d0f87f0e407a33'
// 			});

// 			// Create new Forms array and include the article
// 			scope.Forms = [sampleArticle];

// 			// Set expected DELETE response
// 			$httpBackend.expectDELETE(/Forms\/([0-9a-fA-F]{24})$/).respond(204);

// 			// Run controller functionality
// 			scope.remove(sampleArticle);
// 			$httpBackend.flush();

// 			// Test array after successful delete
// 			expect(scope.Forms.length).toBe(0);
// 		}));
// 	});
// }());
// 'use strict';

// (function() {
//     // Forms Controller Spec
//     describe('entryPage Directive Tests', function() {
//         // Initialize global variables
//         var scope,
//             $templateCache,
//             $httpBackend,
//             $compile;

//         var sampleStartPage = {
//             showStart: true,
//             introTitle: 'Welcome to Form',
//             introParagraph: 'Sample intro paragraph',
//             buttons:[
//                 {
//                     url: 'http://google.com',
//                     action: '',
//                     text: 'Google',
//                     bgColor: '#ffffff',
//                     color: '#000000',
//                 },
//                 {
//                     url: 'http://facebook.com',
//                     action: '',
//                     text: 'Facebook',
//                     bgColor: '#0000ff',
//                     color: '#000000',
//                 }
//             ]
//         };


//         // The $resource service augments the response object with methods for updating and deleting the resource.
//         // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
//         // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
//         // When the toEqualData matcher compares two objects, it takes only object properties into
//         // account and ignores methods.
//         beforeEach(function() {
//             jasmine.addMatchers({
//                 toEqualData: function(util, customEqualityTesters) {
//                     return {
//                         compare: function(actual, expected) {
//                             return {
//                                 pass: angular.equals(actual, expected)
//                             };
//                         }
//                     };
//                 }
//             });
//         });

//         // Load the main application module
//         beforeEach(module(ApplicationConfiguration.applicationModuleName));

//         beforeEach(inject(function($rootScope, _$compile_, _$httpBackend_) {
//             scope = $rootScope.$new();
//             $compile = _$compile_;

//             // Point global variables to injected services
//             $httpBackend = _$httpBackend_;
//         }));


//         it('should be able to render entryPage in html', function() {
//             scope.myStartPage = _.cloneDeep(sampleStartPage);  
//             var element = angular.element('<entry-page pageData="myStartPage" pageType="startPage"></entry-page>');
//             $compile(element)(scope);
//             scope.$digest();

//             // console.log(element.html());
//             expect(element.html()).not.toEqual('<div class="ng-scope">Start Page</div>');
//         });

//         // it('exitStartPage should work for "startPage" type of entryPage', inject(function($rootScope) {
//         //     scope.myPage = _.cloneDeep(sampleStartPage); 
//         //     var el = angular.element('<entry-page pageData="myPage" pageType="startPage"></entry-page>');
//         //     $compile(el)(scope);
//         //     scope.$digest();

//         //     $httpBackend.whenGET(/.+\.html$/).respond('');
//         //     $httpBackend.whenGET('/users/me/').respond('');

//         //     scope = el.isolateScope() || el.scope();

//         //     scope.exitStartPage();
//         //     // expect(scope.myStartPage.showStart).toBe(false);
//         //     expect(el.html()).not.toEqual('<div>Start Page</div>');
//         // }));
//     });
// }());
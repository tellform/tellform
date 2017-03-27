'use strict';

(function() {
    // Forms Controller Spec
    describe('ConfigureForm Directive-Controller Tests', function() {
        // Initialize global variables
         var el, scope, controller, $httpBackend;

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
                {fieldType:'textfield', title:'First Name', fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed873933b0ce121f1deafab9'},
                {fieldType:'checkbox', title:'nascar',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed83b0ce121f17393deafab9'},
                {fieldType:'checkbox', title:'hockey',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed8317393deab0ce121ffab9'}
			],
            pdf: {},
            pdfFieldMap: {},
            startPage: {
                showStart: false
            },
            hideFooter: false,
            isGenerated: false,
            isLive: false,
            autofillPDFs: false,
            _id: '525a8422f6d0f87f0e407a33'
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

        beforeEach(inject(function($compile, $controller, $rootScope, _$httpBackend_) {
            //Instantiate directive.
            var tmp_scope = $rootScope.$new();
            tmp_scope.myform = sampleForm;
            tmp_scope.user = sampleUser;

            //gotacha: Controller and link functions will execute.
            el = angular.element('<configure-form-directive myform=\'myform\' user=\'user\'></configure-form-directive>');
            $compile(el)(tmp_scope);
            $rootScope.$digest();

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;

            // $httpBackend.whenGET(/.+\.html$/).respond('');
            $httpBackend.whenGET('/users/me/').respond('');

            //Grab controller instance
            controller = el.controller();

            //Grab scope. Depends on type of scope.
            //See angular.element documentation.
            scope = el.isolateScope() || el.scope();

        }));
    });
}());

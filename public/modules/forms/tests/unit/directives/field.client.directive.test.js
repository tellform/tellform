'use strict';

(function() {
    // Forms Controller Spec
    describe('Field Directive Tests', function() {
        // Initialize global variables
        var scope,
            FormFields,
            $templateCache,
            $httpBackend,
            $compile;

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

        var sampleFields = [
            {fieldType:'textfield', title:'First Name',                 fieldValue: 'AoeuName', deletePreserved: false, required: true, disabled: false},
            {fieldType:'email',     title:'Email',                      fieldValue: 'aoeu@aoeu.com', deletePreserved: false, required: true, disabled: false},
            {fieldType:'yes_no',    title:'Do you Play Hockey?',        fieldValue: 'true', deletePreserved: false, required: true, disabled: false},
            {fieldType:'url',       title:'Github Account',             fieldValue: 'http://github.com/aoeu', deletePreserved: false, required: true, disabled: false},
            {fieldType:'textarea',  title:'Bio',                        fieldValue: 'This is my bio.', deletePreserved: false, required: true, disabled: false},
            {fieldType:'number',    title:'Phone #',                    fieldValue: 5325325325, deletePreserved: false, required: true, disabled: false},
            {fieldType:'legal',     title:'You agree to terms and conditions',  description:'By selecting \'I agree\' you are agreeing under Canadian law that you have read and accept terms and conditions outlayed below', fieldValue: '', deletePreserved: false, required: true, disabled: false},
            {fieldType:'dropdown',  title:'Your Sex', fieldValue: '', fieldOptions:[ { 'option_id': 0, 'option_title': 'M', 'option_value': 'male' }, { 'option_id': 1, 'option_title': 'F', 'option_value': 'female' }], deletePreserved: false, required: true, disabled: false},
            {fieldType:'radio',     title:'Your Sexual Orientation',    fieldValue: '', fieldOptions:[ { 'option_id': 0, 'option_title': 'Heterosexual', 'option_value': 'hetero' }, { 'option_id': 1, 'option_title': 'Homosexual', 'option_value': 'homo' }, { 'option_id': 2, 'option_title': 'Bisexual', 'option_value': 'bi' }, { 'option_id': 3, 'option_title': 'Asexual', 'option_value': 'asex' }], deletePreserved: false, required: true, disabled: false},
            {fieldType:'rating',    title:'Your Current Happiness',     fieldValue: '0', deletePreserved: false, required: true, disabled: false},
        ];


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

        beforeEach(module(function ($sceProvider) {
              $sceProvider.enabled(false);
        }));

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(module('stateMock'));
        beforeEach(module('module-templates'));

        beforeEach(module('ngSanitize', 'ui.select'));

        beforeEach(inject(function($rootScope, _FormFields_, _$compile_, _$httpBackend_) {
            scope = $rootScope.$new();
            FormFields = _FormFields_;

			// Point global variables to injected services
			$httpBackend = _$httpBackend_;
			$httpBackend.whenGET(/.+\.yml/).respond('');

            $compile = _$compile_;
        }));

        it('should be able to render all field types in html', inject(function($rootScope) {
            scope.fields = sampleFields;

            for(var i=0; i<sampleFields.length; i++){
                var field = sampleFields[i];
                if(!field.title) field.title = '';

                scope.myfield = field;
                var element = angular.element('<field-directive field="myfield"></field-directive>');
                $compile(element)(scope);
                scope.$digest();

                expect(element.html()).not.toEqual('<div class="ng-binding ng-scope>'+field.title+'</div>');
            }
        }));
    });
}());

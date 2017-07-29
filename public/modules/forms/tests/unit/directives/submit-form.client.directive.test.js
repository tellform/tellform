'use strict';

(function() {
    // Forms Controller Spec
    describe('SubmitForm Directive-Controller Tests', function() {
        // Initialize global variables
         var scope, controller, $httpBackend;

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
                {fieldType:'checkbox', title:'hockey',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed8317393deab0ce121ffab9'}            ],
            visible_form_fields: [
                {fieldType:'textfield', title:'First Name', fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed873933b0ce121f1deafab9'},
                {fieldType:'checkbox', title:'nascar',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed83b0ce121f17393deafab9'},
                {fieldType:'checkbox', title:'hockey',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed8317393deab0ce121ffab9'}            ],
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

        var sampleSubmission = {
            form_fields: [
                {fieldType:'textfield', title:'First Name',             fieldValue: 'John Smith',   deletePreserved: false, _id: 'ed873933b0ce121f1deafab9'},
                {fieldType:'yes_no',    title:'Do you like nascar',     fieldValue: true,           deletePreserved: false, _id: 'ed83b0ce121f17393deafab9'},
                {fieldType:'yes_no',    title:'Do you like hockey',     fieldValue: false,          deletePreserved: false, _id: 'ed8317393deab0ce121ffab9'}
            ],
            admin: sampleUser,
            form: sampleForm,
            timeElapsed: 17.55
        };

        var sampleSubmissions = [{
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'The Terminator', deletePreserved: false},
                {fieldType:'yes_no',    title:'Do you like nascar',     fieldValue: 'true', deletePreserved: false},
                {fieldType:'yes_no',    title:'Do you like hockey',     fieldValue: 'false', deletePreserved: false}
            ],
            admin: sampleUser,
            form: sampleForm,
            timeElapsed: 10.33
        },
        {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
                {fieldType:'yes_no',    title:'Do you like nascar',     fieldValue: 'true',     deletePreserved: false},
                {fieldType:'yes_no',    title:'Do you like hockey',     fieldValue: 'true',     deletePreserved: false}
            ],
            admin: sampleUser,
            form: sampleForm,
            timeElapsed: 2.33
        },
        {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'Jane Doe', deletePreserved: false},
                {fieldType:'yes_no',    title:'Do you like nascar',     fieldValue: 'false',    deletePreserved: false},
                {fieldType:'yes_no',    title:'Do you like hockey',     fieldValue: 'false',    deletePreserved: false}
            ],
            admin: sampleUser,
            form: sampleForm,
            timeElapsed: 11.11
        }];

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

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET('/users/me/').respond('');

            //Instantiate directive.
            var tmp_scope = $rootScope.$new();
            tmp_scope.myform = sampleForm;

            //gotacha: Controller and link functions will execute.
            var el = angular.element('<submit-form-directive myform=\'myform\'></submit-form-directive>');
            $compile(el)(tmp_scope);
            tmp_scope.$digest();
            $rootScope.$digest();

            //Grab controller instance
            controller = el.controller();

            //Grab scope. Depends on type of scope.
            //See angular.element documentation.
            scope = el.isolateScope() || el.scope();
		}));

        var Validator = (function() {
            return {
                hasMinimumFields: function(entry) {
                    return !_.isEmpty(entry._id) && !_.isEmpty(entry.title);
                },
                isNewForm: function(entry) {
                    return this.hasMinimumFields(entry);
                }
            };
        })();


        it('$scope.submitForm() should submit valid form', function(){
            //Initialize variables
            scope.myform.form_fields = sampleSubmissions[0].form_fields;

            var expectedForm = _.cloneDeep(sampleForm);
            expectedForm.form_fields = sampleSubmissions[0].form_fields;
            delete expectedForm.visible_form_fields;

            var data = function(data) {
                var form = angular.fromJson(data);
                var compareForm = _.cloneDeep(form);
                delete compareForm.timeElapsed;
                delete compareForm.percentageComplete;

                return Validator.isNewForm(form) && _.isEqual(compareForm, expectedForm);
            };

            //Set expected HTTP requests
            $httpBackend.expect('POST',/^(\/forms\/)([0-9a-fA-F]{24})$/, data).respond(200);

            //Run Controller Logic to Test
            scope.submitForm(function(error){
				expect(error).toBe(null);
				expect(scope.myform.submitted).toBe(true);
				expect(scope.error).toEqual('');
			});
        });

        it('$scope.reloadForm() should reset and reload form', function(){
            scope.submitForm();
            scope.reloadForm();

            expect(scope.myform.submitted).toBe(false);
            for(var i=0; i<scope.myform.form_fields.length; i++){
                expect(scope.myform.form_fields[i].fieldValue).toEqual('');
            }
        });

    });
}());

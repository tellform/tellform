'use strict';

(function() {
    // Forms Controller Spec
    describe('EditSubmissions Directive-Controller Tests', function() {
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
            _id: 'ed873933b1f1dea0ce12fab9',
        };

        var pdfObj = {
            fieldname:"file",
            originalname:"test.pdf",
            name:"1440112660375.pdf",
            encoding:"7bit",
            mimetype:"application/pdf",
            path:"uploads/tmp/test@test.com/1440112660375.pdf",
            extension:"pdf",
            size:56223,
            truncated:false,
            buffer:null
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
            pdf: {},
            pdfFieldMap: {},
            startPage: {
                showStart: false
            },
            hideFooter: false,
            isGenerated: false,
            isLive: false,
            autofillPDFs: false,
            _id: '525a8422f6d0f87f0e407a33',
        };

        var sampleSubmission = {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: 1, deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: 0, deletePreserved: false}
            ],
            admin: sampleUser, 
            form: sampleForm,
            timeElapsed: 17.55
        };

        var sampleSubmissions = [{
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'The Terminator', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: 0, deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: 1, deletePreserved: false}
            ],
            admin: sampleUser, 
            form: sampleForm,
            timeElapsed: 10.33
        },
        {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: 1, deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: 0, deletePreserved: false}
            ],
            admin: sampleUser, 
            form: sampleForm,
            timeElapsed: 2.33
        },
        {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'Jane Doe', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: 1, deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: 1, deletePreserved: false}
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
        beforeEach(module('stateMock'));
        beforeEach(module('module-templates'));

        beforeEach(inject(function($compile, $controller, $rootScope, _$httpBackend_) {
            
            // Point global variables to injected services
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('/users/me/').respond('');
            $httpBackend.whenGET(/^(\/forms\/)([0-9a-fA-F]{24})(\/submissions)$/).respond(200, sampleSubmissions);

            //Instantiate directive.
            var tmp_scope = $rootScope.$new();
            tmp_scope.myform = sampleForm;
            tmp_scope.user = sampleUser;

            //gotacha: Controller and link functions will execute.
            el = angular.element('<edit-submissions-form-directive myform="myform" user="user"></edit-submissions-form-directive>');
            $compile(el)(tmp_scope);
            $rootScope.$digest();

            //Grab controller instance
            controller = el.controller();

            //Grab scope. Depends on type of scope.
            //See angular.element documentation.
            scope = el.isolateScope() || el.scope();
        }));

        it('$scope.initFormSubmissions() should fetch all relevant form submissions', function() {
            $httpBackend.expectGET(/^(\/forms\/)([0-9a-fA-F]{24})(\/submissions)$/).respond(200, sampleSubmissions);
            scope.initFormSubmissions();
            $httpBackend.flush();
            scope.$digest();
        });

        describe('Form Table Methods', function(){

            it('$scope.toggleAllCheckers should toggle all checkboxes in table', function(){
                scope.initFormSubmissions();
                $httpBackend.flush();

                //Run Controller Logic to Test
                scope.table.masterChecker = true;
                scope.toggleAllCheckers();

                for(var i=0; i<scope.table.rows.length; i++){
                    expect(scope.table.rows[i].selected).toBe(true);
                }
                expect(scope.table.rows.length).not.toEqual(0);
            });

            it('$scope.isAtLeastOneChecked should return true when at least one checkbox is selected', function(){
                scope.initFormSubmissions();
                $httpBackend.flush();

                scope.table.masterChecker = true;
                scope.toggleAllCheckers();

                //Run Controller Logic to Test
                var atLeastOne = scope.isAtLeastOneChecked();

                expect(atLeastOne).toBe(true);
            });

            it('$scope.deleteSelectedSubmissions should delete all submissions that are selected', function(){
                scope.initFormSubmissions();
                $httpBackend.flush();

                scope.table.masterChecker = true;
                scope.toggleAllCheckers();
                
                $httpBackend.expect('DELETE', /^(\/forms\/)([0-9a-fA-F]{24})(\/submissions)$/).respond(200);

                //Run Controller Logic to Test
                scope.deleteSelectedSubmissions();

                $httpBackend.flush();
                expect(scope.table.rows.length).toEqual(0);
            });
        });

    });
}());
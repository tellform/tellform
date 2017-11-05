'use strict';

(function() {
    // Forms Controller Spec
    describe('EditFormSubmissions Directive-Controller Tests', function() {
        // Initialize global variables
         var el, scope, controller, $httpBackend;

        var sampleUser = {
            firstName: 'Full',
            lastName: 'Name',
            email: 'test@test.com',
            username: 'test1234',
            password: 'password',
            provider: 'local',
            roles: ['user'],
            _id: 'ed873933b1f1dea0ce12fab9'
        };

        var sampleVisitors = [{
            socketId: '33b1f1dea0ce12fab9ed8739',
            referrer: 'https://tellform.com/examples',
            lastActiveField: 'ed873933b0ce121f1deafab9',
            timeElapsed: 100000,
            isSubmitted: true,
            language: 'en',
            ipAddr: '192.168.1.1',
            deviceType: 'desktop',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4'
        }]

        var sampleForm = {
            title: 'Form Title',
            admin: 'ed873933b1f1dea0ce12fab9',
            language: 'english',
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed873933b0ce121f1deafab9'},
                {fieldType:'checkbox', title:'nascar',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed83b0ce121f17393deafab9'},
                {fieldType:'checkbox', title:'hockey',      fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed8317393deab0ce121ffab9'}
            ],
            analytics: {
				visitors: sampleVisitors,
                conversionRate: 80.5,
                fields: [
                    {
                        dropoffViews: 0,
                        responses: 1,
                        totalViews: 1,
                        continueRate: 100,
                        dropoffRate: 0,
                        field: {fieldType:'textfield', title:'First Name', fieldOptions: [], fieldValue: '', required: true, disabled: false, deletePreserved: false, _id: 'ed873933b0ce121f1deafab9'}
                    }
                ]
			},
			submissions: [],
            startPage: {
                showStart: false
            },
			endPage: {
				showEnd: false
			},
            hideFooter: false,
            isGenerated: false,
            isLive: false,
            _id: '525a8422f6d0f87f0e407a33'
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
            timeElapsed: 10.33,
            selected: false
        },
        {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'John Smith', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: 1, deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: 0, deletePreserved: false}
            ],
            admin: sampleUser,
            form: sampleForm,
            timeElapsed: 2.33,
            selected: false
        },
        {
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: 'Jane Doe', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: 1, deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: 1, deletePreserved: false}
            ],
            admin: sampleUser,
            form: sampleForm,
            timeElapsed: 11.11,
            selected: false
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

			sampleForm.submissions = sampleSubmissions;
            $httpBackend.whenGET('/users/me/').respond('');
            $httpBackend.whenGET(/^(\/forms\/)([0-9a-fA-F]{24})$/).respond(200, sampleForm);
			$httpBackend.whenGET('/forms').respond(200, sampleForm);
			$httpBackend.whenGET(/^(\/forms\/)([0-9a-fA-F]{24})$/).respond(200, sampleForm);
            $httpBackend.whenGET(/^(\/forms\/)([0-9a-fA-F]{24})\/submissions$/).respond(200, sampleSubmissions);
            $httpBackend.whenGET(/^(\/forms\/)([0-9a-fA-F]{24})\/visitors$/).respond(200, sampleVisitors);
			
            //Instantiate directive.
            var tmp_scope = $rootScope.$new();
            tmp_scope.myform = sampleForm;
            tmp_scope.user = sampleUser;

            //gotacha: Controller and link functions will execute.
            el = angular.element('<edit-submissions-form-directive myform=\'myform\' user=\'user\'></edit-submissions-form-directive>');
            $compile(el)(tmp_scope);
            $rootScope.$digest();

            //Grab controller instance
            controller = el.controller();

            //Grab scope. Depends on type of scope.
            //See angular.element documentation.
            scope = el.isolateScope() || el.scope();
        }));

        describe('Form Table Methods', function(){

            it('$scope.toggleAllCheckers should toggle all checkboxes in table', function(){
                //Run Controller Logic to Test
                scope.table.rows = sampleSubmissions;
                scope.table.masterChecker = true;
                scope.toggleAllCheckers();

                for(var i=0; i<scope.table.rows.length; i++){
                    expect(scope.table.rows[i].selected).toBe(true);
                }
                expect(scope.table.rows.length).not.toEqual(0);
            });

            it('$scope.isAtLeastOneChecked should return true when at least one checkbox is selected', function(){
                scope.table.rows = sampleSubmissions;
                scope.table.masterChecker = true;
                scope.toggleAllCheckers();

                //Run Controller Logic to Test
                var atLeastOne = scope.isAtLeastOneChecked();

                expect(atLeastOne).toBe(true);
            });

            it('$scope.deleteSelectedSubmissions should delete all submissions that are selected', function(){
                $httpBackend.expect('GET', /^(\/forms\/)([0-9a-fA-F]{24})(\/submissions)$/).respond(200, sampleSubmissions);
                scope.table.masterChecker = true;
                scope.getSubmissions(function(err){
                    scope.toggleAllCheckers();

                    $httpBackend.expect('DELETE', /^(\/forms\/)([0-9a-fA-F]{24})(\/submissions)$/).respond(200);

                    //Run Controller Logic to Test
                    scope.deleteSelectedSubmissions().then(function(){
                        expect(scope.table.rows.length).toEqual(0);
                    });
                    expect(err).not.toBeDefined();

                });
                $httpBackend.flush();

            });
        });

    });
}());

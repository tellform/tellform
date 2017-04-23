'use strict';

(function() {
    // Forms Controller Spec
    describe('ListForms Controller Tests', function() {
        // Initialize global variables
        var createListFormsController,
            scope,
            $httpBackend,
            $state;

        var sampleForm = {
            title: 'Form Title',
            admin: 'ed873933b1f1dea0ce12fab9',
            language: 'english',
            form_fields: [
                {fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false},
                {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false},
                {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false}
            ],
            _id: '525a8422f6d0f87f0e407a33'
        };

        var sampleFormList = [{
                title: 'Form Title1',
                admin: 'ed873933b1f1dea0ce12fab9',
                language: 'english',
                form_fields: [
                    {fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false},
                    {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false},
                    {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false}
                ],
                _id: '525a8422f6d0f87f0e407a33'
            },{
                title: 'Form Title2',
                admin: '39223933b1f1dea0ce12fab9',
                language: 'english',
                form_fields: [
                    {fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false},
                    {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false},
                    {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false}
                ],
                _id: '52f6d0f87f5a407a384220e3'
            },{
                title: 'Form Title3',
                admin: '2fab9ed873937f0e1dea0ce1',
                language: 'english',
                form_fields: [
                    {fieldType:'textfield', title:'First Name', fieldValue: '', deletePreserved: false},
                    {fieldType:'checkbox', title:'nascar',      fieldValue: '', deletePreserved: false},
                    {fieldType:'checkbox', title:'hockey',      fieldValue: '', deletePreserved: false}
                ],
                _id: '922f6d0f87fed8730e4e1233'
            }
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

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(module('stateMock'));

        //Mock Users Service
        beforeEach(module(function($provide) {
            $provide.service('myForm', function($q) {
                return sampleForm;
            });
        }));


        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, _$state_, _$httpBackend_, CurrentForm) {
            // Set a new global scope
            scope = $rootScope.$new();

            //Set CurrentForm
            CurrentForm.setForm(sampleForm);

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;
            $state = _$state_;

            $httpBackend.whenGET(/\.html$/).respond('');
            $httpBackend.whenGET('/users/me/').respond('');

            // Initialize the Forms controller.
            createListFormsController = function(){
                return $controller('ListFormsController', { $scope: scope });
            };
        }));

        it('$scope.findAll() should query all User\'s Forms', inject(function() {

            var controller = createListFormsController();

            // Set GET response
            $httpBackend.expectGET(/^(\/forms)$/).respond(200, sampleFormList);

            // Run controller functionality
            scope.findAll();
            $httpBackend.flush();

            // Test scope value
            expect( scope.myforms ).toEqualData(sampleFormList);
        }));

        it('$scope.duplicateForm() should duplicate a Form', inject(function() {

            var dupSampleForm = sampleFormList[2],
                dupSampleForm_index = 3,
                newSampleFormList = _.clone(sampleFormList);
            dupSampleForm._id = 'a02df75b44c1d26b6a5e05b8';
            newSampleFormList.splice(3, 0, dupSampleForm);

            var controller = createListFormsController();

            // Set GET response
            $httpBackend.expectGET(/^(\/forms)$/).respond(200, sampleFormList);
            // Run controller functionality
            scope.findAll();
            $httpBackend.flush();

            // Set GET response
            $httpBackend.expect('POST', '/forms').respond(200, dupSampleForm);
            // Run controller functionality
            scope.duplicateForm(2);
            $httpBackend.flush();

            // Test scope value
            expect( scope.myforms.length ).toEqual(newSampleFormList.length);
            for(var i=0; i<scope.myforms.length; i++){
                expect( scope.myforms[i] ).toEqualData(newSampleFormList[i]);
            }
            expect( scope.myforms[dupSampleForm_index] ).toEqualData(dupSampleForm);
        }));

        it('$scope.removeForm() should remove a Form', inject(function() {

            var delIndex = 0,
                delSampleForm = sampleFormList[delIndex],
                delSampleFormList = _.clone(sampleFormList);
            delSampleFormList.splice(delIndex, 1);

            var controller = createListFormsController();

            // Set GET response
            $httpBackend.expectGET(/^(\/forms)$/).respond(200, sampleFormList);

            // Run controller functionality
            scope.findAll();
            $httpBackend.flush();

            // Set GET response
            $httpBackend.expect('DELETE', /^(\/forms\/)([0-9a-fA-F]{24})$/).respond(200, delSampleForm);

            // Run controller functionality
            scope.removeForm(delIndex);
            $httpBackend.flush();

            // Test scope value
            expect( scope.myforms.length ).toEqual(delSampleFormList.length);
            for(var i=0; i<scope.myforms.length; i++){
                expect( scope.myforms[i] ).toEqualData(delSampleFormList[i]);
            }
            expect( scope.myforms[0] ).not.toEqualData(delSampleForm);
        }));

        it('$scope.createNewForm() should create a new Form', inject(function() {
            var newForm = _.clone(sampleForm);
            newForm.name = 'Test Form5';

            var controller = createListFormsController();

            scope.forms.createForm = {
                language: {
                    $modelValue: 'english'
                },
                title: {
                    $modelValue: 'Test Form5'
                },
                $dirty: true,
                $valid: true
            };

            //Set $state transition
            $state.expectTransitionTo('viewForm.create');

            // Set GET response
            $httpBackend.expect('POST', '/forms').respond(200, newForm);

            scope.createNewForm();

            $httpBackend.flush();
            $state.ensureAllTransitionsHappened();
        }));

    });
}());

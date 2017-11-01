'use strict';

(function() {
    // Forms Controller Spec
    describe('EditForm Directive-Controller Tests', function() {
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
                showStart: false,
                buttons: []
            },
            hideFooter: false,
            isGenerated: false,
            isLive: false,
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

        //Mock FormFields Service
        beforeEach(module(function($provide) {
            $provide.service('FormFields', function() {
                return {
                    types: [
                        {
                            name : 'textfield',
                            value : 'Short Text'
                        },
                        {
                            name : 'email',
                            value : 'Email'
                        }
                    ]
                };
            });
        }));

        var newFakeModal = function(){
            var modal = {
                opened: true,
                close: function( item ) {
                    //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                    this.opened = false;
                },
                dismiss: function( type ) {
                    //The user clicked cancel on the modal dialog, call the stored cancel callback
                    this.opened = false;
                }, 
                result: {
                    then: function (cb) {
                        if(cb && typeof cb === 'function'){
                            cb();
                        }
                    }
                }
            };
            return modal;
        };

        //Mock $uibModal
        beforeEach(inject(function($uibModal) {
            var modal = newFakeModal();
            spyOn($uibModal, 'open').and.returnValue(modal);
        }));

        beforeEach(inject(function($compile, $controller, $rootScope, _$httpBackend_) {
            //Instantiate directive.
            var tmp_scope = $rootScope.$new();
            tmp_scope.myform = _.cloneDeep(sampleForm);

            //gotacha: Controller and link functions will execute.
            el = angular.element('<edit-form-directive myform=\'myform\'></edit-form-directive>');
            $compile(el)(tmp_scope);
            $rootScope.$digest();

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;

            //$httpBackend.whenGET(/.+\.html$/).respond('');
            $httpBackend.whenGET('/users/me/').respond('');

            //Grab controller instance
            controller = el.controller();

            //Grab scope. Depends on type of scope.
            //See angular.element documentation.
            scope = el.isolateScope() || el.scope();

			scope.update = function(updateImmediately, data, isDiffed, refreshAfterUpdate, cb){
				if(cb) cb();
			};

        }));

        describe('> Form Field >',function(){

        	beforeEach(function(){
        		scope.myform = _.cloneDeep(sampleForm);
        	});

	        it('$scope.addNewField() should open the new field modal', function() {

	        	//Run controller methods
	            scope.addNewField('textfield');

                expect(scope.editFieldModal.opened).toBeTruthy();
	        });

	        it('$scope.deleteField() should DELETE a field to $scope.myform.form_fields', function() {

				spyOn(scope, 'update');

				//Run controller methods
	            scope.deleteField(0);

				expect(scope.update).toHaveBeenCalled();
	            expect(scope.myform.form_fields.length).toEqual(sampleForm.form_fields.length-1);
	            expect(_.first(scope.myform.form_fields)).toEqualData(sampleForm.form_fields[1]);
	        });

	        it('$scope.duplicateField() should DUPLICATE a field and update $scope.myform.form_fields', function() {

				spyOn(scope, 'update');

	        	//Run controller methods
	            scope.duplicateField(0);

	            var originalField = _.cloneDeep(scope.myform.form_fields[0]);
	            originalField.title += ' copy';
	            delete originalField._id;

	            var copyField = _.cloneDeep(scope.myform.form_fields[3]);
	            delete copyField._id;

				expect(scope.update).toHaveBeenCalled();
	            expect(scope.myform.form_fields.length).toEqual(sampleForm.form_fields.length+1);
	            expect(originalField).toEqualData(copyField);
	        });

		});
    });
}());

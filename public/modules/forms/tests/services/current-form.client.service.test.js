'use strict';

(function() {
    // Forms Controller Spec
    describe('CurrentForm Service Tests', function() {
        // Initialize global variables
        var CurrentForm,
        	sampleForm = {
	            title: 'Form Title',
	            admin: 'ed873933b1f1dea0ce12fab9',
	            language: 'english',
	            form_fields: [
	                {'fieldType':'textfield', 'title':'First Name', 'fieldValue': '', 'deletePreserved': false},
	                {'fieldType':'checkbox', 'title':'nascar',      'fieldValue': '', 'deletePreserved': false},
	                {'fieldType':'checkbox', 'title':'hockey',      'fieldValue': '', 'deletePreserved': false}
	            ],
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

        beforeEach(inject(function (_CurrentForm_) {
		    CurrentForm = _CurrentForm_;
		 }));


        it('CurrentForm be able to get() and set() a Form', function() {
        	CurrentForm.setForm(sampleForm);
            var newForm = CurrentForm.getForm();
            expect(sampleForm).toEqualData(newForm);
        });
    });
}());
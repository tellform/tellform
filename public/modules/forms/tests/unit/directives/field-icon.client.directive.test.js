'use strict';

(function() {
    // Forms Controller Spec
    describe('FieldIcon Directive Tests', function() {
        // Initialize global variables
        var scope,
            FormFields,
            faClasses = {
                'textfield': 'fa fa-pencil-square-o',
                'dropdown': 'fa fa-th-list',
                'date': 'fa fa-calendar',
                'checkbox': 'fa fa-check-square-o',
                'radio': 'fa fa-dot-circle-o',
                'email': 'fa fa-envelope-o',
                'textarea': 'fa fa-pencil-square',
                'legal': 'fa fa-legal',
                'file': 'fa fa-cloud-upload',
                'rating': 'fa fa-star-half-o',
                'link': 'fa fa-link',
                'scale': 'fa fa-sliders',
                'stripe': 'fa fa-credit-card',
                'statement': 'fa fa-quote-left',
                'yes_no': 'fa fa-toggle-on',
                'number': 'fa fa-slack'
            };

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function ($rootScope, _FormFields_) {
            scope = $rootScope.$new();
            FormFields = _FormFields_;
		}));

        it('should be able render all field-icon types', inject(function($compile) {
            var currType, currClass;

            for(var i=0; i<FormFields.types.length; i++){
                currType = FormFields.types[i];
                currClass = faClasses[currType.name];

                var element = $compile('<field-icon-directive type-name="'+currType.name+'"></field-icon-directive>')(scope);
                scope.$digest();

                expect(currClass).toBeDefined();

                expect(element.find('i')).not.toBe(null);
                expect(element.find('i').hasClass(currClass)).toBe(true);
            }

        }));
    });
}());
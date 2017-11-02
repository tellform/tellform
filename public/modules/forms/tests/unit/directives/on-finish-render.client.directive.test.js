'use strict';

(function() {
    // Forms Controller Spec
    describe('onFinishRender Directive Tests', function() {
        // Initialize global variables
        var scope;

        var FormFields = {
            types: [
                {
                    name : 'textfield',
                    value : 'Short Text'
                },
                {
                    name : 'email',
                    value : 'Email'
                },
                {
                    name : 'radio',
                    value : 'Muliple Choice'
                },
                {
                    name : 'dropdown',
                    value : 'Dropdown'
                },
                {
                    name : 'date',
                    value : 'Date'
                },
                {
                    name : 'textarea',
                    value : 'Paragraph',
                },
                {
                    name : 'yes_no',
                    value : 'Yes/No',
                },
                {
                    name : 'legal',
                    value : 'Legal',
                },
                {
                    name : 'rating',
                    value : 'Rating',
                },
                {
                    name : 'link',
                    value : 'Link',
                },
                {
                    name : 'number',
                    value : 'Numbers',
                },
                {
                    name : 'statement',
                    value : 'Statement'
                }
            ]
        };

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        //Mock FormFields Service
        beforeEach(module(function($provide) {
            $provide.service('FormFields', function() {
                return FormFields;
            });
        }));

        beforeEach(inject(function ($rootScope) {
            scope = $rootScope.$new();
            spyOn($rootScope, '$broadcast');

        }));

        it('should emit Custom "Finished" and "Started" events on ng-repeat', inject(function($compile, $rootScope) {
            scope.myfields = FormFields.types;

            $compile('<div><div ng-repeat="item in myfields" on-finish-render="editFormFields">{{item.name}}</div></div>')(scope);
            scope.$digest();

            //run code to test
            expect($rootScope.$broadcast).toHaveBeenCalledWith('editFormFields Started');
            expect(scope.$broadcast).toHaveBeenCalledWith('editFormFields Finished');
        }));

        it('should emit "ngRepeat Finished" and "ngRepeat Started" events on ng-repeat when attr is not set to string', inject(function($compile, $rootScope) {
            scope.myfields = FormFields.types;

            $compile('<div><div ng-repeat="item in myfields" on-finish-render>{{item.name}}</div></div>')(scope);
            scope.$digest();

            //run code to test
            expect($rootScope.$broadcast).toHaveBeenCalledWith('ngRepeat Started');
            expect(scope.$broadcast).toHaveBeenCalledWith('ngRepeat Finished');
        }));

    });
}());

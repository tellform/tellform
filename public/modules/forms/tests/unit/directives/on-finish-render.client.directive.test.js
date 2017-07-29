'use strict';

(function() {
    // Forms Controller Spec
    describe('onFinishRender Directive Tests', function() {
        // Initialize global variables
        var scope,
            FormFields;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function ($rootScope, _FormFields_) {
            scope = $rootScope.$new();
            FormFields = _FormFields_;
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

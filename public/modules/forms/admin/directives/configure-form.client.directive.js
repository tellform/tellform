'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$http', 'Upload', 'CurrentForm',
    function ($rootScope, $http, Upload, CurrentForm) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/configure-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            },
            controller: function($scope){
                $scope.log = '';
                $scope.languages = $rootScope.languages;

                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

            }
        };
    }
]);

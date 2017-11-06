'use strict';

angular.module('forms').directive('designFormDirective', [
    function () {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/design-form.client.view.html',
            restrict: 'E',
            scope: {
               myform:'=',
               formurl: '='
            }
        }
    }
]);
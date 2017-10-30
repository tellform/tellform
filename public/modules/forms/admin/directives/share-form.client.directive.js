'use strict';

angular.module('forms').directive('shareFormDirective', ['$rootScope',
    function ($rootScope) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/share-form.client.view.html',
            restrict: 'E',
            scope: {
                actualformurl:'='
            },
            controller: function($scope){
                $scope.actualFormURL = $scope.actualformurl;
            }
        };
    }
]);